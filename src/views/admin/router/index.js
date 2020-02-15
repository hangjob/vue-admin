/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-15 00:09:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

import { defaultRouter } from './admin.js'; // 加载路由
import store from '../store'

Vue.use(VueRouter);


const router = new VueRouter({
    routes: defaultRouter,
    mode: "hash",
    base: __dirname, //比如设置 base: test 路由链接解析后 test/#/views-b
    strict: process.env.NODE_ENV !== "production"
});


// 路由全局拦截
router.beforeEach(async(to, from, next) => {
    let hasLogin = localStorage.getItem("hasLogin")
    if (hasLogin) {
        if (!store.state.menuList.length) {
            await store.dispatch('getMenuList')
            next({...to, replace: true })
        }
        if (to.name === 'login') {
            next({
                path: '/main',
            })
        } else {
            next()
        }
    } else {
        if (to.name !== 'login') {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    }
})


// 路由全局后置钩子
router.afterEach(to => {

})

export default router;