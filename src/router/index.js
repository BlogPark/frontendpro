import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);
export default new VueRouter({
    routes:
        [
            {
                path: "/login",
                name: "login",
                component: () => import("@/view/login/index.vue")
            },
            {
                path: "/",
                component: () => import("@/layout/index.vue"),
                redirect:'/index',
                children: [
                    {
                      path:'/index',
                        name: "index",
                        component: () => import("@/view/home/index.vue")
                    },
                    {
                        path: "/order",
                        name: "orderlist",
                        component: () => import("@/view/order/orderlist.vue")
                    },
                    {
                        path: "/orderdetail",
                        name: "orderdetail",
                        component: () => import("@/view/order/orderdetail.vue")
                    },
                    {
                        path: "/pinboard",
                        name: "pinboard",
                        component: () => import("@/view/pinboard/index.vue")
                    },
                    {
                        path: "/editor",
                        name: "editorview",
                        component: () => import("@/view/editorview/index.vue")
                    }
                ]
            }
        ]
})
