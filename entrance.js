import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import http from './src/http/request'

Vue.config.productionTip = false

Vue.prototype.$http = http;

export default Vue;