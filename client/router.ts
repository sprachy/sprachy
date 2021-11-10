import Router from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'
import FrontPage from './FrontPage.vue'
import SignupPage from './SignupPage.vue'
import HomePage from './HomePage.vue'
import SettingsPage from './SettingsPage.vue'
import PatternPage from './PatternPage.vue'
import AdminUsersPage from './AdminUsersPage.vue'
import LearnPage from './LearnPage.vue'
import ReviewPage from './ReviewPage.vue'
import PageNotFound from './PageNotFound.vue'

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
        path: "/learn",
        name: "learn",
        component: LearnPage
      },
      {
        path: "/review",
        name: "review",
        component: ReviewPage
      },
      {
        path: "/settings",
        name: "settings",
        component: SettingsPage
      },
      {
        path: "/pattern/:slug",
        name: "pattern",
        component: PatternPage,
        props: route => ({ slug: route.params.slug })
      },
      {
        path: "/admin/users",
        name: "adminUsers",
        component: AdminUsersPage
      },
      {
        path: '*',
        component: PageNotFound
      }
    ]
  })

  // router.beforeEach((to, from, next) => {

  // })

  return router
}
