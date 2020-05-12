import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import http from './src/http/request'

import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();

export default Vue;