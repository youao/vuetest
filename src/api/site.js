import request from "@/utils/request";

export function getHome() {
    return request.get("/site/home", {}, { cache: 600 });
}