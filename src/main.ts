import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { makeRouter } from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: makeRouter()
}).$mount('#app')
