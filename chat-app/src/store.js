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
    },
    currentUser: ''
  },
  mutations: {
    changeView (state, view) {
      state.view = view
    },
    login (state, name) {
      state.currentUser = name
      state.auth = 'logged in'
      state.view = 'chat'
    },
    logout (state) {
      state.currentUser = ''
      state.auth = 'logged out'
      state.view = 'login'
    },
    addUser(state, payload) {
      state.users[payload.name] = payload.password
    }
  },
  actions: {

  }
})
