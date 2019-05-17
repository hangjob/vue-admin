import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default new VueRouter({
    mode: "hash",
    base: __dirname, //比如设置 base: test 路由链接解析后 test/#/views-b
    routes:[
        {
            path: "/",
            redirect:"/home"
        },
        {
            path: "/",
            component: resolve=> require(["../../views/admin/components/main.vue"],resolve),
            meta: { title: ""},
            children:[
                {
                    path: "/home",
                    component: resolve=> require(["../../views/admin/src/home/home.vue"],resolve),
                    meta: { title: "系统首页"},
                },
                {
                    path: "/preview",
                    component: resolve=> require(["../../views/admin/src/preview/preview.vue"],resolve),
                    meta: { title: "网页预览"},
                },
                {
                    path: "/btnste",
                    component: resolve=> require(["../../views/admin/src/btnste/btnste.vue"],resolve),
                    meta: { title: "按钮预览"},
                },
                {
                    path: "/pushset",
                    component: resolve=> require(["../../views/admin/src/pushset/pushset.vue"],resolve),
                    meta: { title: "桌面通知"},
                },
                {
                    path: "/itste",
                    component: resolve=> require(["../../views/admin/src/site/site.vue"],resolve),
                    meta: { title: "网址管理"},
                },
                {
                    path: "/itstair",
                    component: resolve=> require(["../../views/admin/src/site/site.vue"],resolve),
                    meta: { title: "一级分类"},
                },
                {
                    path: "/twostair",
                    component: resolve=> require(["../../views/admin/src/site/site.vue"],resolve),
                    meta: { title: "二级分类"},
                },
            ]
        },
        {
            path: "*",
            component: resolve=> require(["../../views/admin/src/404/404.vue"],resolve),
            meta: { title: "404"},
        },
        {
            path: "/login",
            component: resolve=> require(["../../views/admin/src/login/login.vue"],resolve),
            meta: { title: "管理员登录"},
        }
    ]
});