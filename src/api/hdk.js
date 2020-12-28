import request from "@/utils/request";

/**
 * 好单库列表
 */
export function getHdkList(data) {
    return request.get("/hdk/list", data, { cache: 600 });
}