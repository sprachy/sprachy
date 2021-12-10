import type { ProgressSummary } from "../common/api"
import { SprachyApp } from "./app"
import { HTTPProvider, UserAPI } from "./ClientAPI"

export const api = new UserAPI(new HTTPProvider())
export const backgroundApi = new UserAPI(new HTTPProvider())

/** State of things when we're logged out */
export function getAnonContext() {
  return { api, backgroundApi }
}

let app: SprachyApp

export function initApp(summary: ProgressSummary) {
  app = new SprachyApp(api, summary)
}

/** State of things when we're logged in */
export function getUserContext() {
  return { api, backgroundApi, app }
}