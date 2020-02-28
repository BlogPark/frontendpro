import {post} from "../../util/httputil";

export function getAllEntities(data) {
    console.log('查询实体开始执行');
    return post('/drools/entitylist', data)
}
