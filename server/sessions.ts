// We use Cloudflare's KV storage for sessions, which are transient expirable data
// So no need to put them in a more stable database

import type { H3Event } from "h3"
import { v4 as uuidv4 } from "uuid"
import * as time from "~/lib/time"
import { type KVStoreClient, getKVStore } from "./kvs"
import { pick } from "lodash-es"

export class SessionStore {
  constructor(readonly kvs: KVStoreClient) { }

  async getById(sessionId: string): Promise<Session | null> {
    return await this.kvs.getJson(`sessions:${sessionId}`)
  }

  async create(userId: number): Promise<Session> {
    const sessionId = uuidv4()
    const session = { sessionId, userId }
    await this.kvs.putJson(
      `sessions:${sessionId}`,
      session,
      { expirationTtl: time.weeks(52) / 1000 }
    )
    return session
  }

  async expire(sessionKey: string) {
    return await this.kvs.delete(`sessions:${sessionKey}`)
  }

  setSessionCookie(event: H3Event, session: Session) {
    const sessionData = pick(session, 'sessionId', 'userId') satisfies SessionCookieData
    setCookie(event, "sprachySession", JSON.stringify(sessionData), {
      httpOnly: true,
      // maxAge is in seconds
      maxAge: time.weeks(52) / 1000,
      // Needed for cookie to be sent to every url accessed on the site
      // rather than just /api
      path: "/"
    })
  }

  async getFromCookie(event: H3Event): Promise<Session | null> {
    const sessionStr = getCookie(event, 'sprachySession')
    if (!sessionStr) return null

    try {
      // Note: important not to just deserialize and return as
      // then anyone could claim to be any user by setting their own cookie
      return this.getById(JSON.parse(sessionStr).sessionId)
    } catch (err) {
      console.error("Error parsing session cookie", err)
      return null
    }
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
