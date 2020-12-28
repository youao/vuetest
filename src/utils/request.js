import axios from "axios";
import app from "@/config";

const _config = {
    baseURL: 'http://www.xiaoxishengqian.com/ych/api.php',
    timeout: 20000
}
axios.defaults.withCredentials = true;
var instance = axios.create(_config);
const defaultOpt = { login: false, dataType: 'json' };

function baseRequest(options) {
    if (app.$mode == 'app') {
        const { url, method, data, params, files, dataType } = options;
        console.log(_config.baseURL + url);
        console.log(JSON.stringify(params));
        return new Promise((resolve, reject) => {
            api.ajax({
                url: _config.baseURL + url,
                method,
                data: {
                    values: method == 'get' ? params : data,
                    files
                },
                timeout: _config.timeout / 1000,
            }, (ret) => {
                console.log(JSON.stringify(ret))
                // console.log(ret)
                
                if (ret) {
                    resolve(ret);
                } else {
                    reject(err);
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
                return Promise.resolve(data);
            }
        });
    }
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
        return baseRequest(
            Object.assign({ url, params, method }, defaultOpt, options)
        );
    };
});

export default request;