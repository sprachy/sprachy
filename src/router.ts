import Router from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'
import FrontPage from './FrontPage.vue'
import SignupPage from './SignupPage.vue'
import HomePage from './HomePage.vue'

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
      {
        path: "/signup",
        name: "signup",
        component: SignupPage
      },
      {
        path: "/home",
        name: "home",
        component: HomePage
      }
      // {
      //     path: '*',
      //     component: PageNotFound
      // }
    ]
  })

  return router
}
