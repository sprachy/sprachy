import { User } from 'firebase/auth'
import VueRouter from 'vue-router'

/**
 * Global store for cross-component data and caches
 */
export class VokabonApp {
  firebaseUser: User|null = null
 
  constructor(readonly router: VueRouter) {}

  get user() {
    if (!this.firebaseUser) {
      throw new Error(`Expected to have user information`)
    }
    return this.firebaseUser!
  }
}