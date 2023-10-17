// We use Cloudflare's KV storage for sessions, which are transient expirable data
// So no need to put them in a more stable database

import type { H3Event } from "h3"
import { v4 as uuidv4 } from "uuid"
import * as time from "~/lib/time"
import { type KVStoreClient, getKVStore } from "./kvs"

export class SessionStore {
  constructor(readonly kvs: KVStoreClient) { }

  async get(sessionKey: string): Promise<Session | null> {
    const sess = await this.kvs.getJson(`sessions:${sessionKey}`)
    if (sess === null) {
      return null
    } else {
      return Object.assign({}, { sessionKey: sessionKey }, sess as { userId: number })
    }
  }

  async create(userId: number): Promise<string> {
    const sessionKey = uuidv4()
    await this.kvs.putJson(
      `sessions:${sessionKey}`,
      { userId: userId },
      { expirationTtl: time.weeks(52) / 1000 }
    )
    return sessionKey
  }

  async expire(sessionKey: string) {
    return await this.kvs.delete(`sessions:${sessionKey}`)
  }

  setSessionCookie(event: H3Event, sessionKey: string) {
    setCookie(event, "sprachySessionKey", sessionKey, {
      httpOnly: true,
      // maxAge is in seconds
      maxAge: time.weeks(52) / 1000,
      // Needed for cookie to be sent to every url accessed on the site
      // rather than just /api
      path: "/"
    })
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
