import {fetch} from "../../utils/httputil";

export function getpinboards() {
    console.log('查询标签开始执行');
    return fetch('/pinboard/get')
}
