/*
 * @Author: your name
 * @Date: 2020-04-29 21:32:37
 * @LastEditTime: 2020-04-29 22:05:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import NProgress from 'nprogress'

import defaultRouter from './defaultRouter'
import dynamicRouter from './dynamicRouter';

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
            }, 200)
        })
    }
})

// 消除路由重复警告
const selfaddRoutes = function(params) {
    router.matcher = new VueRouter().matcher;
    router.addRoutes(params);
}

router.beforeEach((to, from, next) => {
    const { hasRoute } = store.state;
    NProgress.start();
    if (hasRoute) {
        next()
    } else {
        dynamicRouter(to, from, next, selfaddRoutes)
    }
})

router.afterEach((to,from)=>{
    NProgress.done();
    NProgress.remove();
})

export default router;