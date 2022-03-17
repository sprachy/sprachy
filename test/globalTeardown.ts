import { Server } from "http"

declare const global: { miniflareServer: Server }

export default async function globalTeardown() {
  global.miniflareServer.close()
}
