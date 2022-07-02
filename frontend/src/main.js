import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import DatePicker from 'vue2-datepicker'

import 'vue2-datepicker/index.css';

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(Vuex)

Vue.use(DatePicker)

const store = new Vuex.Store({
  state: {
    loginUserID: -1
  },
  plugins: [createPersistedState()],
  mutations: {
    setLoginSession: (state, id) => state.loginUserID = id,
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
