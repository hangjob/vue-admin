import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import http from './src/http/request'

import 'nprogress/nprogress.css'

import * as utils from './src/utils/util';


Vue.config.productionTip = false

Vue.prototype.$utils = utils;
Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();

export default Vue;