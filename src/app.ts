import { signOut, User } from 'firebase/auth'
import VueRouter, { RawLocation, Route } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import _ from 'lodash'

/**
 * Global store for cross-component data and caches
 */
export class VokabonApp {
  user: User | null = null

  constructor(readonly router: VueRouter) {
  }

  get expectedUser() {
    if (!this.user) {
      throw new Error(`Expected to have user information`)
    }
    return this.user!
  }

  /**
   * For some reason, vue-router throws a NavigationDuplicated error if the user
   * clicks on something that takes them to the route they're already on. This just
   * wraps it to not do that. (there's probably a better way to do this)
   */
  async navigate(location: RawLocation, replace: boolean = false): Promise<Route> {
    const targetRoute = this.router.resolve(location).route
    if (!_.isEqual(targetRoute, this.router.currentRoute)) {
      try {
        if (replace)
          return await this.router.replace(location)
        else
          return await this.router.push(location)
      } catch (err) {
        // Handle strange vue-router behavior https://github.com/vuejs/vue-router/issues/2932#issuecomment-532810521
        // And also ignore multiple-redirect errors https://stackoverflow.com/a/65326844/1983739
        if (err && !err.message.includes("navigation guard"))
          throw err
        else
          return this.router.currentRoute
      }
    } else {
      return this.router.currentRoute
    }
  }

  async navigateReplace(location: RawLocation): Promise<Route> {
    return this.navigate(location, true)
  }

  /** Purge any auth details and return to the login screen. */
  async logout(opts: { redirectBackTo?: string } = {}) {
    const auth = getAuth()
    await signOut(auth)
    this.navigate({
      name: 'login',
    })
  }
}