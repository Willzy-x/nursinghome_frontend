import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import mutations from './mutation'
import state from './state'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})