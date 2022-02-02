import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  // 把token存進localstorage
  plugins: [createPersistedState({
    key: 'Glacier',
    paths: ['user.token']
  })]
})
