export default [
    {
        path: "*",
        component: resolve=> require(["../src/error/404.vue"],resolve),
        meta: { title: "404"},
    },
    {
        path: "/login",
        component: resolve=> require(["../src/login/index.vue"],resolve),
        meta: { title: "登录"},
    }
]