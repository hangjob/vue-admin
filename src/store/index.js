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
        },
        setSyncTime(state, val){
            this.dispatch('getSyncTime');   // mutations 调用 actions
            this.commit('hasRoute',''); // mutations 调用 mutations 
        }
    },
    actions: {
        // actions 调用 mutations
        // context.commit('hasRoute',res)
        getSyncTime(context){
            context.commit('hasRoute','')
        }
    }
})