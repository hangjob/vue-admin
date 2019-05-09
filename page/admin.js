import Vue from "vue";

import Admin from "../src/page/admin/admin.vue";
import router from "../src/router/router";
import { getOs } from "../util/util";

import lodash from "lodash";

//处理根字体
import "../util/setrem";

// Object.defineProperty(Vue.prototype, "lodash", { value: lodash });
Vue.prototype.$lodash = lodash;

import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);


//状态管理
import store from "../src/store/index";

import "../static/animate.css@3.5.1.css";

import "../static/font-awesome-4.7.0/css/font-awesome.min.css";

import "../src/page/admin/common/less/style.less";

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
    el: "#app",
    render: h => h(Admin),
    router,
    store,
    beforeCreate(){
        Vue.prototype.bus = this;
    }
}); 