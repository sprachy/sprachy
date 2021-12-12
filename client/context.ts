import type { ProgressSummary } from "../common/api"
import { SprachyApp } from "./app"
import { HTTPProvider, UserAPI } from "./ClientAPI"

const api = new UserAPI(new HTTPProvider())
const backgroundApi = new UserAPI(new HTTPProvider())

/** State of things when we're logged out */
export function getAnonContext() {
  return { api, backgroundApi }
}


let app: SprachyApp

export function initApp(summary: ProgressSummary) {
  app = new SprachyApp(api, summary)
  return app
}
export function maybeUserContext() {
  return { api, backgroundApi, app: app as SprachyApp|null, user: app?.user||null }
}

/** State of things when we're logged in */
export function userContext() {
  return { api, backgroundApi, app }
}