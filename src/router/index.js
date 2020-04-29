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
            }, 200)
        })
    }
})

// 消除路由重复警告
const selfaddRoutes = function (params) {
    router.matcher = new VueRouter().matcher;
    router.addRoutes(params);
}

router.beforeEach((to, from, next) => {
    const { hasRoute } = store.state;
    if (hasRoute) {
        next()
    } else {
        addPostRouter(to, from, next, selfaddRoutes)
    }
})

export default router;