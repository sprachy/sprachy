import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { SprachyRouter } from './router'
import { SprachyApp } from './app'
import { HTTPProvider, UserAPI } from './ClientAPI'
import './app.sass'
import Dialogue from './Dialogue.vue'
import Avatar from './Avatar.vue'
import LTable from './LTable.vue'
import Sprachdown from './Sprachdown.vue'
import PlapperLog from './PlapperLog.vue'
import PlapperLogMessage from './PlapperLogMessage.vue'
import PlapperMessage from './PlapperMessage.vue'
import { Component } from "vue-property-decorator"
import VueMeta from 'vue-meta'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import VueTimeago from "vue-timeago"
import type { ProgressSummary } from '../common/api'

Vue.config.productionTip = false
Vue.use(SprachyRouter)
Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(VueTimeago, {
  locale: 'en'
})
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('dialogue', Dialogue)
Vue.component('avatar', Avatar)
Vue.component('ltable', LTable)
Vue.component('plapper-log', PlapperLog)
Vue.component('msg', PlapperLogMessage)
Vue.component('plapper-message', PlapperMessage)
Vue.component('sprachdown', Sprachdown)

library.add(fas)

const router = new SprachyRouter()

Component.registerHooks([
  'metaInfo'
])

/**
 * So components can expose variables to console for debugging
 **/
Object.defineProperty(Vue.prototype, '$debug', {
  get() { return window as Record<string, any> }
})

let app: SprachyApp | null = null

Object.defineProperty(Vue.prototype, '$initApp', {
  get() {
    return (summary: ProgressSummary) => {
      app = Vue.observable(new SprachyApp(userApi, summary))
    }
  }
})

Object.defineProperty(Vue.prototype, '$closeApp', {
  get() {
    return () => {
      localStorage.removeItem("summary")
      app = null
    }
  }
})

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
  get() { return app?.user }
})

Object.defineProperty(Vue.prototype, '$admin', {
  get() { return app?.user && app?.user.isAdmin }
})

Object.defineProperty(Vue.prototype, '$routing', {
  get() { return router }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
