
import Vue from 'vue'

// eslint-disable-next-line no-console

import App from './admin/admin.vue'
import router from "../extend/router/index";

import { getOs } from "../extend/util/util";

import iView from "iview";
import "iview/dist/styles/iview.css";
import "./admin/css/style.less";
Vue.use(iView);

Vue.config.productionTip = false

// 通过路由钩子函数判断做出你响应的业务需求
router.beforeEach((to, from, next) => {
    // 判断路由有无
    if(!to.matched || to.matched.length===0){
        next("404");
        return false;
    }
    // 判断浏览器阻止其后面行为
    if( getOs() == "MSIE7" || getOs() == "MSIE6"){
        alert("浏览器不支持");
    }else{
        // 一般用于 登录 权限
        const role = localStorage.getItem("token");
        if(!role && to.path !== "/login"){
            next("/login");
        }else{
            next();
        }
    }
});


new Vue({
    render: h => h(App),
    router
}).$mount('#app')
