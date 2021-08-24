import Router from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'
import FrontPage from './FrontPage.vue'

export function makeRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: "/",
        name: "frontpage",
        component: FrontPage
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage
      },
      // {
      //     path: '*',
      //     component: PageNotFound
      // }
    ]
  })

  return router
}
