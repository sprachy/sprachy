import { SprachyUserSPA } from "~/lib/SprachyUserSPA"

let app: SprachyUserSPA

export async function initSPA(summary?: ProgressSummary) {
  const api = useSprachyAPI()
  app = new SprachyUserSPA(api, api, summary)
  return app
}