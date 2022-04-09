
import { browser } from "$app/env"

import { SprachyAPIClient } from "$lib/client/SprachyAPIClient"
import { SprachyUserSPA } from "$lib/client/SprachyUserSPA"
import _ from "lodash"
// @ts-ignore
import NProgress from "accessible-nprogress?client"
import type { ProgressSummary } from "./api"

declare const window: {
  sprachy: SprachyContextManager
  api: SprachyAPIClient
  spa: SprachyUserSPA
}

/**
 * This singleton class is used to differentiate between different
 * global states of the app. Code can use it to declare its expectation
 * that the user be logged in or that it's running in the browser.
 */
export class SprachyContextManager {
  api?: SprachyAPIClient
  backgroundApi?: SprachyAPIClient
  spa?: SprachyUserSPA

  initBrowser() {
    this.api = new SprachyAPIClient()
    this.backgroundApi = new SprachyAPIClient()

    // For debugging
    window.sprachy = this
    window.api = this.api
  }

  async initSPA(summary?: ProgressSummary) {
    const { api } = this.expectBrowser()

    if (!summary) {
      summary = await api.getProgress()
    }
    this.spa = new SprachyUserSPA(api, summary)

    // For debugging
    window.spa = this.spa
  }

  /**
   * Expect Sprachy code to be running in the browser
   * and ready to make API requests to the backend.
   */
  expectBrowser() {
    const { api, backgroundApi } = this

    if (!api || !backgroundApi) {
      throw new Error(`Expected to be running in the browser. Did we forget to put this route in authedRoutes?`)
    }

    return { api, backgroundApi }
  }

  /**
   * Expect the user to be logged in and single-page app
   * functionality to be available.
   */
  expectSPA() {
    const { api, backgroundApi } = this.expectBrowser()
    const { spa } = this

    if (!spa) {
      throw new Error("Expected the user SPA to be initialized")
    }

    return { spa, api, backgroundApi }
  }
}

const sprachy = new SprachyContextManager()
if (browser) {
  sprachy.initBrowser()
}
export default sprachy