import request from '@/utils/request'

/**实体部分*/
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

/**规则部分*/
export function getAllRule(data) {
    return request({
        url: '/drools/rulelist',
        method: 'post',
        data: data
    })
}

/**分组部分*/
export function getAllGroup(data) {
    return request({
        url: '/drools/grouplist',
        method: 'post',
        data: data
    })
}

/**模板部分*/
export function getAllTemplate(data) {
    return request({
        url: '/drools/templatelist',
        method: 'post',
        data: data
    })
}

/**函数部分*/
export function getAllFunction(data) {
    return request({
        url: '/drools/functionlist',
        method: 'post',
        data: data
    })
}
