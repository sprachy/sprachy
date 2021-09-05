import Router from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'
import FrontPage from './FrontPage.vue'
import SignupPage from './SignupPage.vue'
import HomePage from './HomePage.vue'
import AdminPatternsPage from './AdminPatternsPage.vue'
import EditPatternPage from './EditPatternPage.vue'
import { expectInt } from './utils'

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
      },
      {
        path: "/admin/patterns",
        name: "adminPatterns",
        component: AdminPatternsPage
      },
      {
        path: "/admin/patterns/new",
        name: "adminPatternsNew",
        component: EditPatternPage
      },
      {
        path: "/admin/patterns/:id",
        name: "adminPatternsEdit",
        component: EditPatternPage,
        props: route => ({ patternId: expectInt(route.params.id) })
      }
      // {
      //     path: '*',
      //     component: PageNotFound
      // }
    ]
  })

  return router
}
