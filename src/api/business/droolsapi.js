import request from '@/utils/request'

export function getAllEntities(data) {
    return request({
        url: '/drools/entitylist',
        method: 'post',
        data: data
    })
}

export function getEntitiyInfo(data) {
    return request({
        url: '/drools/entityinfo',
        method: 'get',
        params: data
    })
}
