
import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "procuction";

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict :debug
});