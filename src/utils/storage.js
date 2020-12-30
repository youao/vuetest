import { isType } from "@/utils";

const ls = window.localStorage;

function get(key) {
    let res = ls.getItem(key);
    if (!res) {
        return null;
    }
    let obj = JSON.parse(res);
    if (obj.expirse && new Date().getTime() > obj.expirse) {
        ls.removeItem(key);
    } else {
        return obj.value;
    }
    return null;
}

function set(key, value, expirse) {
    let obj = { value };
    if (typeof expirse == 'number') {
        obj.expirse = new Date().getTime() + expirse * 1000;
    } else if (isType(expirse, "Date")) {
        obj.expirse = expirse.getTime();
    }
    ls.setItem(key, JSON.stringify(obj));
}

function remove(key) {
    ls.removeItem(key);
}

function clearAll() {
    ls.clear();
}

export default {
    get,
    set,
    remove,
    clearAll
};