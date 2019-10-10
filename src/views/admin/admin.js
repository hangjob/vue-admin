import Vue from 'vue'
import App from './admin.vue'

import store from './store'
import router from './router'
import '@/style/reset.css'

import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
