import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './user'
import track from './track'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    track
  },
  // 把token存進localstorage
  plugins: [createPersistedState({
    key: 'Glacier',
    paths: ['user.token', 'track._id']
  })]
})
