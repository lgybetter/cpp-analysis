import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import app from './app'
import router from './routers'

Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  router,
  el: '#app',
  render: to => to(app)
})