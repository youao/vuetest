import axios from "axios";
import $storage from "@/utils/storage";
import { jsonToStr } from "@/utils";
import md5 from "js-md5";

const _config = {
    baseURL: process.env.VUE_APP_APIURL,
    timeout: 20000
}
axios.defaults.withCredentials = true;
var instance = axios.create(_config);
const defaultOpt = { login: false };

function baseRequest(options) {
    const { url, method, params, data, cache, files } = options;
    if (process.env.VUE_APP_MODE == 'app') {
        return new Promise((resolve, reject) => {
            api.ajax({
                url: _config.baseURL + url,
                method,
                data: {
                    values: method == 'get' ? params : data,
                    files
                },
                timeout: _config.timeout / 1000,
            }, (res) => {
                if (!res) {
                    return reject({ msg: "请求失败" });
                }
                if ([0].indexOf(res.status) !== -1) {
                    return reject(res);
                } else {
                    setApiCache(cache, res, method, url, params);
                    resolve(res);
                }
            });
        })
    } else {
        return instance(options).then(res => {
            const data = res.data || {};
            if (res.status !== 200)
                return Promise.reject({ msg: "请求失败", res, data });
            if ([0].indexOf(data.status) !== -1) {
                return Promise.reject(data);
            } else {
                setApiCache(cache, data, method, url, params);
                return Promise.resolve(data);
            }
        });
    }
}

function setApiCache(cache, data, method, url, params) {
    if (!cache || method != 'get') return;
    let key = getApiCacheKey(url, params);
    $storage.set(key, data, cache)
}

function getApiCacheKey(url, params) {
    let cacheKey = jsonToStr({
        base: _config.baseURL + url + '?',
        data: params
    });
    return 'api_cache_' + md5(cacheKey);
}

const request = ["post", "put", "patch"].reduce((request, method) => {
    request[method] = (url, data = {}, options = {}) => {
        return baseRequest(
            Object.assign({ url, data, method }, defaultOpt, options)
        );
    };
    return request;
}, {});

["get", "delete", "head"].forEach(method => {
    request[method] = (url, params = {}, options = {}) => {
        const { cache } = options;
        if (cache && method == 'get') {
            let key = getApiCacheKey(url, params);
            let res = $storage.get(key);
            if (res) return Promise.resolve(res);
        }
        return baseRequest(
            Object.assign({ url, params, method }, defaultOpt, options)
        );
    };
});

export default request;