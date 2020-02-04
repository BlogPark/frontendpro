import Vue from "vue"
import Vuex from "vuex"
import  tagsView from "./modules/tagsView"

Vue.use(Vuex)

const state = {
    count: 0,
    openedTab: [{
        title: '首页',
        name: 'home',
        allowclose: true,
        type:'info'
    }],
    activeTab: ''
}

const mutations = {
    addcount(state, n = 0) {
        return (state.count += n);
    },
    addTab(state, data) {
        state.openedTab.push(data)

    },
    changeTab(state, componentName) {
        state.activeTab = componentName
    },
    deductTab (state, componentName) {
        let index = state.openedTab.indexOf(componentName)
        state.openedTab.splice(index, 1)
    }
}

const actions = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    tagsView
})
