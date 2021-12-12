import type { ProgressSummary } from "../common/api"
import { UserApp } from "./UserApp"
import { HTTPProvider, SprachyAPIClient } from "./SprachyAPIClient"

/**
 * Global sprachy frontend state
 * Stuff that needs user/progress info should go in UserApp instead
 */
export class SprachyFrontendState {
  readonly api = new SprachyAPIClient(new HTTPProvider())
  readonly backgroundApi = new SprachyAPIClient(new HTTPProvider())
  _app: UserApp|null = null

  initApp(summary: ProgressSummary) {
    this._app = new UserApp(this.api, summary)
    return this._app
  }
  
  closeApp() {
    this._app = null
  }

  /**
   * Assume app is non-null for common access
   * Since most pages are post-login, it'd be tedious to
   * check if it's null every time
   */
  get app() {
    return this._app!
  }

  get user() {
    return this._app?.user
  }
}

const sprachy = new SprachyFrontendState()
export default sprachy