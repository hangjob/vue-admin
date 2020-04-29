import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import http from './src/http/request'

Vue.config.productionTip = false

Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();

export default Vue;