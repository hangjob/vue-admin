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
            component: resolve=> require(["../page/admin/common/component/main.vue"],resolve),
            meta: { title: ""},
            children:[
                {
                    path: "/home",
                    component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                    meta: { title: "系统首页"},
                },
                {
                    path: "/preview",
                    component: resolve=> require(["../page/admin/menu/preview/preview.vue"],resolve),
                    meta: { title: "网页预览"},
                },
                {
                    path: "/imgste",
                    component: resolve=> require(["../page/admin/menu/imgste/imgste.vue"],resolve),
                    meta: { title: "图片预览"},
                },
                {
                    path: "/blockste",
                    component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                    meta: { title: "板块管理"},
                },
                {
                    path: "/reviewste",
                    component: resolve=> require(["../page/admin/menu/site/site2.vue"],resolve),
                    meta: { title: "评论管理"},
                },
                {
                    path: "/itste",
                    component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                    meta: { title: "网址管理"},
                },
                {
                    path: "/itstair",
                    component: resolve=> require(["../page/admin/menu/site/site2.vue"],resolve),
                    meta: { title: "一级分类"},
                },
                {
                    path: "/twostair",
                    component: resolve=> require(["../page/admin/menu/site/site.vue"],resolve),
                    meta: { title: "二级分类"},
                },
                {
                    path: "/itdetails",
                    component: resolve=> require(["../page/admin/menu/site/site2.vue"],resolve),
                    meta: { title: "网址详情"},
                },
            ]
        },
        {
            path: "*",
            component: resolve=> require(["../page/admin/menu/404/404.vue"],resolve),
            meta: { title: "404"},
        },
        {
            path: "/login",
            component: resolve=> require(["../page/admin/menu/login/login.vue"],resolve),
            meta: { title: "管理员登录"},
        }
    ]
});