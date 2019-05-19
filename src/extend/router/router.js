// 路由映射 导航菜单
const routers =  [
    {
        icon: "fa-pie-chart",
        index: "/home",
        title: "系统首页",
        shows:false, 
    },
    {
        icon: "fa-pie-chart",
        title: "组件演示",
        shows:false, // 是否开始就是显示下面的子菜单
        children:[
            {
                index: "/preview",
                title: "网页预览"
            },
            {
                index: "/btnste",
                title: "按钮预览"
            },
            {
                index: "/pushset",
                title: "桌面通知"
            },
            {
                index: "/scroll",
                title: "滚动加载"
            }
        ]
    },
    {
        icon: "fa-pie-chart",
        title: "网址管理",
        shows:false,
        children:[
            {
                index: "/itstair",
                title: "一级分类",
            },
            {
                title: "二级分类",
                shows:false,
                children: [
                    {
                        index: "/twostair",
                        title: "网址详情"
                    },
                    {
                        index: "/itdetails",
                        title: "网址详情"
                    }
                ]
            }
        ]
    }
];
export default routers;