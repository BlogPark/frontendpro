import Vue from "vue"
import App from './App.vue'
import router from "@/router"
import Element from "element-ui"
import store from "@/store"

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
