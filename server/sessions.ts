// We use Cloudflare's KV storage for sessions, which are transient expirable data
// So no need to put them in a more stable database

import type { H3Event } from "h3"
import { v4 as uuidv4 } from "uuid"
// import * as cookie from "cookie"
import * as time from "~/lib/time"
import { kvs } from "~/server/kvs"

export namespace sessions {
  export async function get(sessionKey: string): Promise<Session | null> {
    const sess = await kvs.getJson(`sessions:${sessionKey}`)
    if (sess === null) {
      return null
    } else {
      return Object.assign({}, { sessionKey: sessionKey }, sess as { userId: string })
    }
  }

  export async function create(userId: string): Promise<string> {
    const sessionKey = uuidv4()
    await kvs.putJson(
      `sessions:${sessionKey}`,
      { userId: userId },
      { expirationTtl: time.weeks(52) / 1000 }
    )
    return sessionKey
  }

  export async function expire(sessionKey: string) {
    return await kvs.delete(`sessions:${sessionKey}`)
  }

  export function setSessionCookie(event: H3Event, sessionKey: string) {
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
