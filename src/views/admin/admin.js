/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-14 23:39:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\admin.js
 */
import Vue from 'vue'
import App from './admin.vue'

import store from './store'
import router from './router'
import '@/style/reset.css'

// 把请求方法也挂在到原型上
import * as types from './http/http.js'
Vue.prototype.$http = types

// 将自定义工具扩展到原型上
import utils from '@/util/utils.js'
Vue.prototype.$utils = utils

// 使用ViewUI
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')