import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { makeRouter } from './router'
import { SprachyApp } from './app'
import { HTTPProvider, UserAPI } from './ClientAPI'
import './app.sass'
import Dialogue from './Dialogue.vue'
import DLine from './DLine.vue'
import { Component } from "vue-property-decorator"
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.component('dialogue', Dialogue)
Vue.component('dline', DLine)

const router = makeRouter()

Component.registerHooks([
  'metaInfo'
])

/**
 * So components can expose variables to console for debugging
 **/
Object.defineProperty(Vue.prototype, '$debug', {
  get() { return window as Record<string, any> }
})

const app = Vue.observable(new SprachyApp(router))

Object.defineProperty(Vue.prototype, '$app', {
  get() { return app }
})

const userApi = new UserAPI(new HTTPProvider())
Object.defineProperty(Vue.prototype, '$api', {
  get() { return userApi }
})

// This api won't be watched by App.vue to provide loading indicator
const backgroundApi = new UserAPI(new HTTPProvider())
Object.defineProperty(Vue.prototype, '$backgroundApi', {
  get() { return backgroundApi }
})

Object.defineProperty(Vue.prototype, '$user', {
  get() { return app.expectedUser }
})

Object.defineProperty(Vue.prototype, '$admin', {
  get() { return app.user && app.user.isAdmin }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
