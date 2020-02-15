/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-15 00:15:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\store\index.js
 */
import Vuex from 'vuex'
import Vue from 'vue'
import VueRouter from '../router'
import { getRole, getUserinfo } from '@/views/admin/http/api'
import app from '../config/app'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userInfo: {},
        hasLogin: false, // 表示没有获取过权限，获取完毕后，把状态改成true
        menuList: [], // 存放菜单数据
        hasRol: ''
    },
    getters: {

    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus;
            VueRouter.addRoutes(menus); // 添加到vue-router中
            VueRouter.options.routes = VueRouter.options.routes.concat(menus) // 解决组件中 this.$router.options.routes 获取不到新添加的router
        },
        setUserInfo(state, user) {
            state.userInfo = user;
            state.hasLogin = true;
            localStorage.setItem("hasLogin", state.hasLogin); // 存储获取过权限
        },
        setHasRol(state, rol) {
            state.hasRol = rol;
        }
    },
    actions: {
        // 会调用setMenuList 生成路由并添加路由
        async getMenuList({ commit }) {
            let { data } = await getRole(); // 请求后端接口拉取路由
            let menus = needRoutes(data.menus) // 生成路由信息
            commit('setMenuList', menus)
            return menus;
        },
        async getUserInfo({ dispatch, commit }) {
            let { data } = await getUserinfo(); // 获取用户信息
            commit('setUserInfo', data); // 更新Vuex-setUserInfo
            return data
        }
    }
})


// 生成路由数据
function needRoutes(data) {
    // 判断是否是数组
    if (!Array.isArray(data)) {
        return new TypeError('arr must be an array.');
    }
    let arr = [];

    for (let obj of data) {
        const component = obj.component
        obj.component = resolve => { require(['@/' + component + '.vue'], resolve) }
        arr.push(obj)
    }
    arr.sort(Vue.prototype.$utils.compare('sort')) // 根据后台返回数据sort字段进行排序
    arr = Vue.prototype.$utils.toTree(arr) // 生成树状结构，为后面生成左侧菜单准备
    arr.push(app.defaultErr) // 404路由需要最后添加，不然访问动态的路由会出现404
    return arr;
}