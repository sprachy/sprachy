import type { ProgressSummary } from "$lib/api"
import { UserApp } from "./UserApp"
import { SprachyAPIClient } from "./SprachyAPIClient"
import { LoginRequiredError } from "./GlobalErrorHandler"
import { CanvasEffects } from "./CanvasEffects"

/**
 * Global sprachy frontend state
 * Stuff that needs user/progress info should go in UserApp instead
 */
export class SprachyFrontendState {
  readonly api = new SprachyAPIClient()
  readonly backgroundApi = new SprachyAPIClient()

  /** 
   * For drawing success confetti animation
   */
  // readonly effects = new CanvasEffects()

  _app: UserApp | null = null

  initApp(summary: ProgressSummary) {
    this._app = new UserApp(this.api, summary)
    return this._app
  }

  closeApp() {
    this._app = null
    localStorage.removeItem("summary")
  }

  /**
   * Assume app is non-null for common access
   * Since most pages are post-login, it'd be tedious to
   * check if it's null every time
   */
  get app() {
    if (!this._app) {
      throw new LoginRequiredError()
    }
    return this._app!
  }

  get user() {
    return this._app?.user
  }

  get admin(): boolean {
    return !!this.user?.isAdmin
  }
}


const sprachy = new SprachyFrontendState()

import { browser } from '$app/env'

declare const window: any
if (browser) {
  window.sprachy = sprachy
}

export default sprachy