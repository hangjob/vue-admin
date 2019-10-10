/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from "axios";
import qs from "qs"; // 请求数据的序列化 qs是nodejs的一个库 文档 https://www.npmjs.com/package/qs


import app from '../config/app'
import router from "../router";
import store from '../store'

const Axios = axios.create({
    baseURL: "/", // 因为我本地做了反向代理
    // 网络请求时间，如果超过8秒，请求将被取消
    timeout: 10000,
    // 设置返回数据为json格式
    responseType: "json",
    // 是否允许携带cookie，默认是false，不允许
    withCredentials: true,
    // http状态验证，你可以规定状态码的范围，比如 status >= 200 && status < 300，记住是一个boolean值
    validateStatus: function (status) {
        return true;
    },
    // 请求头部
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if ( config.method === "post" ) {
            // 序列化--若后台提交能直接接受json 格式,可以不用 qs 来序列化的
            config.data = qs.stringify(config.data);
        }
        // 若是有做鉴权token , 就给头部带上token
        // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
        if (store.getters.token) {
            config.headers.token = store.getters.token;
        }
        return config;
    },
    error => {
        console.log('发生错误消息')
        return Promise.reject(error.data);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res && res.code !== app.SUCCESS_CODE) {
            return Promise.reject(res.data);
        }
        return res;
    },
    error => {
        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        if (!store.getters.token) {
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            router.push({
                path: "/login"
            });
        } else {
            if (error.response.status === 403) {
                router.push({
                    path: "/error/403"
                });
            }
            if (error.response.status === 500) {
                router.push({
                    path: "/error/500"
                });
            }
            if (error.response.status === 404) {
                router.push({
                    path: "/error/404"
                });
            }
        }
        // 返回 response 里的错误信息
        let errorInfo = '错误消息';
        return Promise.reject(errorInfo);
    }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};