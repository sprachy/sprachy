import { SprachyAPIClient } from "~/lib/SprachyAPIClient"

let api: SprachyAPIClient

export function useSprachyAPI() {
  if (!api) {
    api = new SprachyAPIClient()
  }
  return api
}