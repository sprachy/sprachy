// We use Cloudflare's KV storage for sessions, which are transient expirable data
// So no need to put them in a more stable database

import { v4 as uuidv4 } from 'uuid'
import * as cookie from "cookie"

declare const STORE: KVNamespace

class KVStoreClient {
  async getText(key: string): Promise<string | null> {
    return await STORE.get(key, "text")
  }

  async getJson<T>(key: string): Promise<T | null> {
    return await STORE.get(key, "json")
  }

  async putText(key: string, value: string, options?: { expirationTtl?: number }) {
    if (options?.expirationTtl) {
      options = { expirationTtl: Math.floor(options.expirationTtl / 1000) }
    }
    return await STORE.put(key, value, options)
  }

  async putJson(key: string, value: Record<string, any>, options?: { expirationTtl?: number }) {
    if (options?.expirationTtl) {
      options = { expirationTtl: Math.floor(options.expirationTtl / 1000) }
    }
    await STORE.put(key, JSON.stringify(value), options)
  }

  async delete(key: string) {
    try {
      await STORE.delete(key)
    } catch (err) {
      // We don't really care that much about errors in deletion
      console.error(err)
    }
  }
}

const kv = new KVStoreClient()

export type Session = {
  key: string
  userId: string
}

export namespace sessions {
  export async function get(sessionKey: string): Promise<Session | null> {
    const sess = await kv.getJson(`sessions:${sessionKey}`)
    if (sess === null) {
      return null
    } else {
      return Object.assign({}, { key: sessionKey }, sess) as Session
    }
  }

  export async function create(userId: string): Promise<string> {
    const sessionKey = uuidv4()
    await kv.putJson(`sessions:${sessionKey}`, { userId: userId }, { expirationTtl: 4 * 7 * 24 * 60 * 60 * 1000 })
    return sessionKey
  }

  export async function expire(sessionKey: string) {
    return await kv.delete(`sessions:${sessionKey}`)
  }

  export function asCookie(sessionKey: string) {
    return cookie.serialize('sessionKey', sessionKey, {
      httpOnly: true,
      maxAge: 3 * 7 * 24 * 60 * 60 * 1000
    })
  }
}