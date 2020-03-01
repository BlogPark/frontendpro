import {post,fetch} from "../../util/httputil";

export function getAllEntities(data) {
    console.log('查询实体开始执行');
    return post('/drools/entitylist', data)
}
export function getEntitiyInfo(data) {
    console.log('查询实体明细开始执行');
    return fetch('/drools/entityinfo', data)
}
