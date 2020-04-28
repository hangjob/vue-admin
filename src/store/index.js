import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        hasRoute: false
    },
    getters: {
        
    },
    mutations: {
        hasRoute(state, val) {
            state.hasRoute = val;
        }
    },
    actions: {
        
    }
})