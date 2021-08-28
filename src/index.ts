import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { makeRouter } from './router'
import { VokabonApp } from './app'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = makeRouter()

const app = Vue.observable(new VokabonApp(router))

Object.defineProperty(Vue.prototype, '$app', {
  get () { return app }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
