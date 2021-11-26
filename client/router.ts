import Router, { RawLocation, Route, RouterOptions } from 'vue-router'
import _ from 'lodash'
import LoginPage from './LoginPage.vue'
import FrontPage from './FrontPage.vue'
import SignupPage from './SignupPage.vue'
import HomePage from './HomePage.vue'
import SettingsPage from './SettingsPage.vue'
import FAQPage from './FAQPage.vue'
import PatternPage from './PatternPage.vue'
import PracticePage from './PracticePage.vue'
import AdminUsersPage from './AdminUsersPage.vue'
import LearnPage from './LearnPage.vue'
import ReviewPage from './ReviewPage.vue'
import PageNotFound from './PageNotFound.vue'
import { globalErrorHandler } from './globalErrorHandling'

const routerOptions: RouterOptions = {
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
      path: "/faq",
      name: "faq",
      component: FAQPage
    },
    {
      path: "/pattern/:slug/practice",
      name: "practice",
      component: PracticePage,
      props: route => ({ slug: route.params.slug })
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
}

export class SprachyRouter extends Router {
  lastRouteChangeWasPopState: boolean = false

  constructor() {
    super(routerOptions)

    // Some hackery here to allow page components to distinguish back/forward button
    // navigation from other kinds of navigation
    let sawPopState = false
    window.addEventListener('popstate', () => {
      sawPopState = true
    })
    this.beforeEach((to: Route, from: Route, next: (params?: any) => void) => {
      globalErrorHandler.dismissError()
      if (sawPopState) {
        this.lastRouteChangeWasPopState = true
        sawPopState = false
      } else {
        this.lastRouteChangeWasPopState = false
      }
      next()
    })
  }

  /**
   * For some reason, vue-router throws a NavigationDuplicated error if the user
   * clicks on something that takes them to the route they're already on. This just
   * wraps it to not do that. (there's probably a better way to do this)
   */
  async navigate(location: RawLocation, replace: boolean = false): Promise<Route> {
    const targetRoute = this.resolve(location).route
    if (!_.isEqual(targetRoute, this.currentRoute)) {
      try {
        if (replace)
          return await this.replace(location)
        else
          return await this.push(location)
      } catch (err: any) {
        // Handle strange vue-router behavior https://github.com/vuejs/vue-router/issues/2932#issuecomment-532810521
        // And also ignore multiple-redirect errors https://stackoverflow.com/a/65326844/1983739
        if (err && !err.message.includes("navigation guard"))
          throw err
        else
          return this.currentRoute
      }
    } else {
      return this.currentRoute
    }
  }

  async navigateReplace(location: RawLocation): Promise<Route> {
    return this.navigate(location, true)
  }
}