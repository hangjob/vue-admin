/*
 * @Author: your name
 * @Date: 2020-04-28 22:15:28
 * @LastEditTime: 2020-04-28 22:28:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\vue-admin\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import defaultRouter from './defaultRouter'
import addPostRouter from './dynamicRouter';

import store from '@/store';



const router = new VueRouter({
    routes: defaultRouter,
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        // keep-alive 返回缓存页面后记录浏览位置
        if (savedPosition && to.meta.keepAlive) {
            return savedPosition;
        }
        // 异步滚动操作
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 500)
        })
    }
})

// 清除重复添加警告  https://www.cnblogs.com/fqh123/p/11571688.html
const selfaddRoutes = function(params) {
    router.matcher = new VueRouter().matcher;
    router.addRoutes(params);
}

router.beforeEach((to, from, next) => {
    console.log(store.state.hasRoute);
    if (store.state.hasRoute) {
        next()
    } else {
        addPostRouter(to, from, next, selfaddRoutes)
    }
})

export default router;