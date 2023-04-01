import { SprachyUserSPA } from "~/lib/SprachyUserSPA"

let app: SprachyUserSPA

export async function initSPA(summary?: ProgressSummary) {
  app = new SprachyUserSPA(api, api, summary)
  return app
}

export function useSprachyApp() {
  if (!app) {
    throw new Error("SprachyUserSPA not initialized")
  }
  return app
}

export function maybeLoggedIn() {
  return app || {} as Partial<SprachyUserSPA>
}