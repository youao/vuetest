import request from "@/utils/request";

/**
 * 好单库列表
 */
export function getHdkList(data) {
    return request.get("/hdk/list", data, { cache: 600 });
}

export function getHdkDetail(id) {
    return request.get("/hdk/detail", { id }, { cache: 60 });
}

export function getHdkClick(id) {
    return request.get("/hdk/ratesurl", { id });
}

export function getHdkHotKey() {
    return request.get("/hdk/hotkey", {}, { cache: 3600 });
}

export function getHdkCat() {
    return request.get("/hdk/cat", {}, { cache: 3600 });
}

export function getHdkSearch(data) {
    return request.get("/hdk/search", data, { cache: 60 });
}