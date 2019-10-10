const adminRouter =  [
    {
        path: "/",
        redirect:"/home",
        children:[
            {
                path: "/home",
                component: resolve=> require(["../src/home/index.vue"],resolve),
                meta: { title: "系统首页"},
            },
            {
                path: "/preview",
                component: resolve=> require(["../src/preview/index.vue"],resolve),
                meta: { title: "网页预览"},
            }
        ]
    }
]
export default adminRouter;