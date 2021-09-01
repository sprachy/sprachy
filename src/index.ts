import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { makeRouter } from './router'
import { VokabonApp } from './app'
import { AdminAPI } from './AdminAPI'

import './app.sass'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = makeRouter()

const app = Vue.observable(new VokabonApp(router))

/**
 * So components can expose variables to console for debugging
 **/
Object.defineProperty(Vue.prototype, '$debug', {
  get() { return window as Record<string, any> }
})

Object.defineProperty(Vue.prototype, '$app', {
  get() { return app }
})

const adminApi = new AdminAPI()
Object.defineProperty(Vue.prototype, '$adminApi', {
  get() { return adminApi }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
