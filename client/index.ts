import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { makeRouter } from './router'
import { VokabonApp } from './app'
import { AdminAPI, UserAPI } from './api'
import { createClient } from '@supabase/supabase-js'
import './app.sass'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = makeRouter()

/**
 * So components can expose variables to console for debugging
 **/
Object.defineProperty(Vue.prototype, '$debug', {
  get() { return window as Record<string, any> }
})

const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

Object.defineProperty(Vue.prototype, '$db', {
  get() { return db }
})

const app = Vue.observable(new VokabonApp(router))

Object.defineProperty(Vue.prototype, '$app', {
  get() { return app }
})

const userApi = new UserAPI()
Object.defineProperty(Vue.prototype, '$api', {
  get() { return userApi }
})

const adminApi = new AdminAPI()
Object.defineProperty(Vue.prototype, '$adminApi', {
  get() { return adminApi }
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