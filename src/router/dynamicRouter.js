import http from '@/http/request';
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
        .then(data => {
            console.log(data)
            defaultRouter[0].children.push(...menusMap(data.data.list));
            selfaddRoutes(defaultRouter);
            store.commit('hasRoute', true);
            next({ ...to, replace: true })
        })
}

export default addPostRouter;