import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
export default new VueRouter({
    routes:
        [
            {
                path: "/login",
                component: () => import("@/view/login/index.vue")
            },
            {
                path: "/layout",
                component: () => import("@/layout/index.vue"),
                children: [
                    {
                        path: "/order",
                        name: "orderlist",
                        component: () => import("@/view/order/orderlist.vue")
                    }
                ]
            },
            {
                path: "/",
                component: () => import("@/view/home/index.vue")
            }
        ]
})
;
