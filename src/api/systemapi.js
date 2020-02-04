import {fetch} from "../util/httputil";

export  function getmenus() {
    console.log('开始执行');
    return fetch('/system/getmenus')
}