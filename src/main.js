import Vue from '../entrance';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible.js'
import  '@/plugin/directive'
// 加载全局组件
import './components';

require('./mock/mock');

window.vm = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
