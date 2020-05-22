import axios from "axios";
import merge from 'lodash/merge'
import qs from 'qs'

const succeeCode = 1; // 成功


/**
 * 实例化
 * config是库的默认值，然后是实例的 defaults 属性，最后是请求设置的 config 参数。后者将优先于前者
 */
const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

/**
 * 请求拦截
 */
http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});


/**
 * 状态码判断 具体根据当前后台返回业务来定
 * @param {*请求状态码} status 
 * @param {*错误信息} err 
 */
const errorHandle = (status, response) => {
    console.log(response)
    switch (status) {
        case 401:
            break;
        case 404:
            vm.$message({ message: `请求路径不存在 ${response.request.responseURL}`, type: 'warning', duration: 1000 * 10, showClose: true });
            break;
        default:
            console.log(err);
    }
}
/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code == succeeCode) {
            return Promise.resolve(response);
        } else {
            vm.$message({ message: response.data.msg, type: 'warning', duration: 1000 * 10, showClose: true });
            return Promise.reject(response)
        }
    } else {
        return Promise.reject(response)
    }
}, error => {
    const { response } = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围 
        errorHandle(response.status, response);
        return Promise.reject(response);
    } else {
        // 处理断网的情况
        if (!window.navigator.onLine) {
            vm.$message({ message: '你的网络已断开，请检查网络', type: 'warning' });
        }
        return Promise.reject(error);
    }
})


/**
 * 请求地址处理
 */
http.adornUrl = (url) => {
    return url;
}

/**
 * get请求参数处理
 * params 参数对象
 * openDefultParams 是否开启默认参数
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        t: new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}


/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        t: new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}


/**
 * windPost请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.windPost = function (url, params) {
    return new Promise((resolve, reject) => {
        http.post(http.adornUrl(url), params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/**
 * windJsonPost请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.windJsonPost = function (url, params) {
    return new Promise((resolve, reject) => {
        http.post(http.adornUrl(url), http.adornParams(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/**
 * windGet请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.windGet = function (url, params) {
    return new Promise((resolve, reject) => {
        http.get(http.adornUrl(url), { params: params })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * 上传图片
 */
http.upLoadPhoto = function (url, params, callback) {
    let config = {}
    if (callback !== null) {
        config = {
            onUploadProgress: function (progressEvent) {
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                callback(progressEvent)
            }
        }
    }
    return new Promise((resolve, reject) => {
        http.post(http.adornUrl(url), http.adornParams(params), config)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
export default http;