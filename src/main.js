import "normalize.css/normalize.css"
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue"
import App from './App.vue'
import router from "@/router"
import Element from "element-ui"
import '@/styles/element-variables.scss'
import echarts from 'echarts'


import '@/styles/index.scss' // global css
import store from "@/store"

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(Element)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
