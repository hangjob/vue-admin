/*
 * @Author: your name
 * @Date: 2020-02-12 22:30:23
 * @LastEditTime : 2020-02-15 00:17:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\http\api.js
 */
import * as types from './http.js'

/**
 * 用户登录
 */
export const getRole = (params) => {
    return types['httpGet']('http://127.0.0.1:3001/role', params)
}

/**
 * 获取用户信息
 */
export const getUserinfo = (params) => {
    return types['httpGet']('http://127.0.0.1:3001/userinfo', params)
}