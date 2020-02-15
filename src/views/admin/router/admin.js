/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-14 23:19:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\router\admin.js
 */

// 默认路由
const defaultRouter = [{
        path: "/",
        redirect: "/main",
        meta: { title: "main", icon: 'md-analytics', shows: false }
    },
    {
        path: "/main",
        name: "main",
        component: resolve => require(["@/views/admin/src/layout/main.vue"], resolve),
        meta: { title: "主页", icon: 'md-analytics', shows: true },
    },
    {
        path: "/login",
        name: "login",
        component: resolve => require(["@/views/admin/src/login/index.vue"], resolve),
        meta: { title: "登录", icon: 'md-person', shows: true },
    }
]


export {
    defaultRouter
};