import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? './' : 'https://www.baidu.com/'

// 全局设置超时时间
axios.defaults.timeout = 10000;

/**
 * 全局请求拦截
 * @param {返回配置参数} config 
 */
axios.interceptors.request.use(function (config) {
    
    // 在请求发出之前篡改参数
    // config.baseURL = '/url/';
    // config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
    // config.timeout = 2500;

    // 一般在这个位置判断token是否存在
    let token = sessionStorage.getItem('token')
    if (token) {
        config.headers = {
            'token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return config;
   }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 全局响应拦截
 * @param {返回数据} response 
 */
axios.interceptors.response.use(function (response){
    // 处理响应数据
   if (response.status === 200) {            
       return Promise.resolve(response);        
   } else {            
       return Promise.reject(response);        
   }
   }, function (error){
   // 处理响应失败
   return Promise.reject(error);
});

/**
 * post请求
 * @param {链接} url 
 * url 如果是一个完整的链接,axios.defaults.baseURL 配置就会失效 ，否则拼接默认配置
 * 列如：ulr='//hn.algolia.com/api/v1/search_by_date?tags=story'  发出的url就是 '//hn.algolia.com/api/v1/search_by_date?tags=story'
 * 列如：ulr='/search_by_date?tags=story' ，发出的url请求是 axios.defaults.baseURL + '/search_by_date?tags=story'
 * @param {参数} params 
 */
export function isPost(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


/**
 * get请求
 * @param {链接} url 
 * @param {参数} params 
 */
export function isGet(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}