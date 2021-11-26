import type VueRouter from 'vue-router'
import _ from 'lodash'
import type { User } from '../common/api'

/**
 * Global store for cross-component data and caches
 */
export class SprachyApp {
  static instance: SprachyApp

  user: User | null = null
  numReviews: number | null = null

  constructor(readonly router: VueRouter) {
    SprachyApp.instance = this
  }
}