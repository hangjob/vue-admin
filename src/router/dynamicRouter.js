import http from '@/http/request';
import VueRouter from '@/router';
import defaultRouter from './defaultRouter'
import store from '@/store'




// 重新构建路由对象
const menusMap = function (menu) {
    return menu.map(v => {
        const { path, name, component } = v
        const item = {
            path,
            name,
            component: () => import(`@/${component}`)
        }
        return item;
    })
}


// 获取路由
const addPostRouter = function (to, from, next, selfaddRoutes) {
    http.windPost('/mock/menu')
        .then(menu => {
            defaultRouter[0].children.push(...menusMap(menu));
            selfaddRoutes(defaultRouter); // 清除重复添加警告  https://www.cnblogs.com/fqh123/p/11571688.html
            store.commit('hasRoute', true);
            next({ ...to, replace: true })
        })
}

export default addPostRouter;