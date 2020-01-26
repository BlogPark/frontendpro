import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    count: 0
}

const mutations = {
    addcount(state, n = 0) {
        return (state.count += n);
    }
}

const actions = {}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
