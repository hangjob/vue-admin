
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default new VueRouter({
    mode: "hash",
    base: __dirname, //比如设置 base: test 路由链接解析后 test/#/views-b
    routes:[
        {
            path: "/",
            redirect:"home"
        },
        {
            path: "/",
            component: resolve=> require(["../page/admin/common/component/main.vue"],resolve),
            meta: { title: "",icon: "fa-pie-chart"},
            shows: false,
            hidden: true,
            children:[
                {
                    path: "/home",
                    component: resolve=> require(["../page/admin/menu/home/home.vue"],resolve),
                    meta: { title: "首页",icon: "fa-pie-chart"},
                    shows: false,
                    hidden: true,
                },
                {
                    path: "/user",
                    component: resolve=> require(["../page/admin/menu/user/user.vue"],resolve),
                    meta: { title: "用户管理",icon: "fa-pie-chart"},
                    shows: false,
                    hidden: true,
                    children:[
                        {
                            path: "/site",
                            component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                            meta: { title: "用户管理1",icon: "fa-pie-chart"},
                            shows: false,
                            hidden: true,
                        },
                        {
                            path: "/site2",
                            component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                            meta: { title: "用户管理2",icon: "fa-pie-chart"},
                            shows: false,
                            hidden: true,
                        }
                    ]
                },
            ]
        },
        {
            path: "/404",
            component: resolve=> require(["../page/admin/menu/404/404.vue"],resolve),
            meta: { title: "404",icon: "fa-pie-chart"},
            shows: false,
            hidden: true,
        },
        {
            path: "/login",
            component: resolve=> require(["../page/admin/menu/login/login.vue"],resolve),
            meta: { title: "管理员登录",icon: "fa-pie-chart"},
            shows: false,
            hidden: true,
        }
    ]
});
