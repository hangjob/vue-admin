/*
 * @Author: your name
 * @Date: 2020-02-12 21:53:42
 * @LastEditTime : 2020-02-15 00:14:56
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\http\http.js
 */
import axios from 'axios'
import router from '../router'
import store from '../store'

//  创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
    // 网络请求时间，如果超过8秒，请求将被取消
    timeout: 10000,
    //根据自己配置的反向代理去设置不同环境的baeUrl
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
    // 设置返回数据为json格式
    responseType: "json",
    // 是否允许携带cookie，默认是false，不允许
    withCredentials: false,
    // http状态验证，你可以规定状态码的范围，比如 status >= 200 && status < 300，记住是一个boolean值
    validateStatus: function(status) {
        return true;
    },
    // 请求头部
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})


// 路由跳转-一般登录过期或者权限不足，默认值login
const redirectRouter = (url = 'login') => {
    // 只有在当前路由不是登录页面才跳转 router.currentRoute.path ===  获取当前路由
    router.currentRoute.path !== 'login' &&
        router.replace({
            path: url,
            query: { redirect: router.currentRoute.path },
        })
}

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

// http response 拦截器
instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        if (error.response.status === 401) {
            // 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT)
            redirectRouter()
        }
    }
    return Promise.reject(error.response.data)
})

// get
const httpGet = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

// post
const httpPost = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

// all 
// 这个其实可以直接axios.all(promiseArray)，为何需要再增加一层Promise？
// 这里是有原因的：
// 1、如果直接axios.all(promiseArray)，请求成功或失败的处理是交由使用者
// 2、这里封装多一层Promise，是便于此处封装时考虑添加公共处理如开启遮罩层关闭遮罩层，之后才抛出调用结果给调用方，而不应该由调用方赖关闭遮罩层
const httpAll = (promiseArray) => {
    return new Promise((resolve, reject) => {
        instance.all(promiseArray)
            .then(allResponse => {
                resolve(allResponse)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// race 
// Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
const HttpRace = (promiseArray) => {
    return new Promise((resolve, reject) => {
        instance.race(promiseArray)
            .then(allResponse => {
                resolve(allResponse)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//  axios.install = (Vue) => {
//     Vue.prototype.$axios = axios
//   }

export {
    httpGet,
    httpPost,
    httpAll,
    HttpRace
}