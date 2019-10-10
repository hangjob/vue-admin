/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import iView from 'iview'

import routes from './routers';
import app from '../config/app'
import store from '../store'

import adminRouter from './admin'

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "hash",
    base: __dirname, //比如设置 base: test 路由链接解析后 test/#/views-b
    routes
});

// 解决异常报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    const token = store.getters.token
    if (!token && to.name !== app.LOGIN_PATH) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: app.LOGIN_PATH // 跳转到登录页
        })
    } else if (!token && to.name === app.LOGIN_PATH ) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === app.LOGIN_PATH) {
        // 已登录且要跳转的页面是登录页-跳转到homeName页
        next({name: '/home'})
    } else {
        //判断role是否存在
        if(store.getters.userinfo.role){
            // 判断router 是否存在 不然死循环
            if(store.getters.newrouter.length !== 0){  
                next();
            }else{
                let newrouter
                if (store.getters.role == 'swper_admin') {  //判断权限
                    newrouter = adminRouter
                } else {
                    let newchildren = adminRouter[0].children.filter(route => {
                        if(route.meta){
                            if(route.meta.role == store.getters.role){
                                return true
                            }
                            return false
                        }else{
                            return true
                        }
                    });
                    newrouter = adminRouter
                    newrouter[0].children = newchildren
                }
                router.addRoutes(newrouter) //添加动态路由
                store.dispatch('Roles',newrouter).then(res => { 
                    next({ ...to ,replace: true})
                }).catch(() => {       

                })
            }	 
        }
    }
})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router;