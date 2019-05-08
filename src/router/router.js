
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default new VueRouter({
    mode: "hash",
    base: __dirname, //比如设置 base: test 路由链接解析后 test/#/views-b
    routes:[
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: resolve=> require(["../page/admin/menu/home/home.vue"],resolve),
            meta: { title: "首页",icon: "fa-pie-chart"},
            shows: false,
            hidden: true,
            children:[
                {
                    path: "/user",
                    component: resolve=> require(["../page/admin/menu/user/user.vue"],resolve),
                    meta: { title: "用户管理",icon: "fa-pie-chart"},
                    shows: false,
                    hidden: true,
                },
                {
                    path: "/site",
                    component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                    meta: { title: "网址管理",icon: "fa-pie-chart"},
                    shows: false,
                    hidden: true,
                    children: [
                        {
                            path: "/404",
                            component: resolve=> require(["../page/admin/menu/404/404.vue"],resolve),
                            meta: { title: "404",icon: "fa-pie-chart"},
                            shows: false,
                            hidden: true,
                        }
                    ]
                }
            ]
        },
        {
            path: "/404",
            component: resolve=> require(["../page/admin/menu/404/404.vue"],resolve),
            meta: { title: "404",icon: "fa-pie-chart"},
            shows: false,
            hidden: true,
        }
    ]
});
