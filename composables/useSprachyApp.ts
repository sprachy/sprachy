import { SprachyUserSPA } from "~/lib/SprachyUserSPA"
import { ProgressSummary } from "~/lib/types"

let app: SprachyUserSPA

export async function initSPA(summary?: ProgressSummary) {
  const api = useSprachyAPI()
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