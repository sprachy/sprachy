// We use Cloudflare's KV storage for sessions, which are transient expirable data
// So no need to put them in a more stable database

import type { H3Event } from "h3"
import { v4 as uuidv4 } from "uuid"
import * as time from "~/lib/time"
import { type KVStoreClient, getKVStore } from "./kvs"

export class SessionStore {
  constructor(readonly kvs: KVStoreClient) { }

  setSessionCookie(event: H3Event, sessionId: string) {
    setCookie(event, "sprachySession", sessionId, {
      httpOnly: true,
      // maxAge is in seconds
      maxAge: time.weeks(52) / 1000,
      // Needed for cookie to be sent to every url accessed on the site
      // rather than just /api
      path: "/"
    })
  }

  async getById(sessionId: string): Promise<Session | null> {
    return await this.kvs.getJson(`sessions:${sessionId}`)
  }

  async create(userId: number): Promise<string> {
    const sessionId = uuidv4()
    await this.kvs.putJson(
      `sessions:${sessionId}`,
      { sessionId, userId },
      { expirationTtl: time.weeks(52) / 1000 }
    )
    return sessionId
  }

  async expire(sessionId: string) {
    return await this.kvs.delete(`sessions:${sessionId}`)
  }

  async getFromCookie(event: H3Event): Promise<Session | null> {
    const sessionId = getCookie(event, 'sprachySession')
    if (!sessionId) return null

    return this.getById(sessionId)
  }
}

export async function getSessionStore(event: Parameters<Parameters<typeof defineEventHandler>[0]>[0]) {
  return new SessionStore(await getKVStore(event))
}
//   export function asCookie(sessionKey: string) {
//     return cookie.serialize("sprachySessionKey", sessionKey, {
//       httpOnly: true,
//       // maxAge is in seconds
//       maxAge: time.weeks(52) / 1000,
//       // Needed for cookie to be sent to every url accessed on the site
//       // rather than just /api
//       path: "/"
//     })
//   }
// }
