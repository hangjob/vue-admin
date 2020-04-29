import Vue from '../entrance';
import App from './App.vue';
import router from './router';
import store from './store';

// 加载全局组件
import './components';

require('./mock/mock');

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
