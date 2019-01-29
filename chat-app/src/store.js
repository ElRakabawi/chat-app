import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: 'logged out',
    view: 'login',
    users: {
      ahmed:'ahmed123',
      mohamed:'mohamed123',
      ted: 'ted123',
      alex: 'alex123'
    }
  },
  mutations: {
    changeView (state, view) {
      state.view = view
    },
    login (state) {
      state.auth = 'logged in'
      state.view = 'chat'
    },
    logout (state) {
      state.auth = 'logged out'
      state.view = 'login'
    }
  },
  actions: {

  }
})
