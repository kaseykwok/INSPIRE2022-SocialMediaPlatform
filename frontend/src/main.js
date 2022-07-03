import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css';
Vue.use(DatePicker)

Vue.config.productionTip = false

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import './validation-rules'
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import Avatar from 'vue-avatar';
Vue.component('Avatar', Avatar);

const store = new Vuex.Store({
  state: {
    loginSession: {
      userID: -1,
      name: '',
      username: '',
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    setLoginSession: (state, {id, name, username}) => {
      state.loginSession.userID = id;
      state.loginSession.name = name;
      state.loginSession.username = username;
    }
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
