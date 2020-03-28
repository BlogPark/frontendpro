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

export function getsingleentity(data) {
    return request({
        url: '/drools/getentity',
        method: 'get',
        params: data
    })
}

export function getentitysbyids(data) {
    return request({
        url: '/drools/getentitisbyids',
        method: 'post',
        data: data
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

export function addNewRule(data) {
    return request({
        url: '/drools/addrule',
        method: 'post',
        data: data
    })
}

export function editRule(data) {
    return request({
        url: '/drools/editrule',
        method: 'post',
        data: data
    })
}

export function getSingleRule(data) {
    return request({
        url: '/drools/selectsinglerule',
        method: 'get',
        params: data
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

export function addNewGroup(data) {
    return request({
        url: '/drools/addgroup',
        method: 'post',
        data: data
    })
}

export function updateGroup(data) {
    return request({
        url: '/drools/updategroup',
        method: 'post',
        data: data
    })
}

export function getSingleGroup(data) {
    return request({
        url: '/drools/getsinglegroup',
        method: 'get',
        params: data
    })
}

export function selectGroupList() {
    return request({
        url: '/drools/selectgrouplist',
        method: 'get',
        params: null
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

export function getSingleTemplate(data) {
    return request({
        url: '/drools/gettemplate',
        method: 'get',
        params: data
    })
}

export function addTemplate(data) {
    return request({
        url: '/drools/addtemplate',
        method: 'post',
        data: data
    })
}

export function editTemplate(data) {
    return request({
        url: '/drools/updatetemplate',
        method: 'post',
        data: data
    })
}

export function selectTemplateList() {
    return request({
        url: '/drools/gettemplatelist',
        method: 'get',
        params: null
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

export function getfunctionlistbyids(data) {
    return request({
        url: '/drools/getfunctionids',
        method: 'post',
        data: data
    })
}

export function getsinglefunction(data) {
    return request({
        url: '/drools/getfunction',
        method: 'get',
        params: data
    })
}

export function editFunction(data) {
    return request({
        url: '/drools/editfunction',
        method: 'post',
        data: data
    })
}

export function addFunction(data) {
    return request({
        url: '/drools/addfunction',
        method: 'post',
        data: data
    })
}

export function getFunction(data) {
    return request({
        url: '/drools/getsinglefunction',
        method: 'get',
        params: data
    })
}

/**
 * 其他部分
 */
export function getquotelist(data) {
    return request({
        url: '/drools/getquotelist',
        method: 'post',
        data: data
    })
}
