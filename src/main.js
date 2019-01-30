import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Notifications from 'vue-notification'
import Gravatar from 'vue-gravatar'

import './../node_modules/bulma/css/bulma.css'

Vue.use(Notifications)
Vue.component('v-gravatar', Gravatar)

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
