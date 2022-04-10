import { dev } from "$app/env"
import { env } from "./env"

/** For development */
async function getDummyStore() {
  // Rollup tree-shakes the import out of the production build
  const { Miniflare } = await import("miniflare")
  const mf = new Miniflare({
    script: "",
    kvNamespaces: ["STORE"],
    kvPersist: true
  })
  return mf.getKVNamespace("STORE")
}

export class DummyStore {
  data: Record<string, string> = {}

  async get(key: string, form: "text" | "json"): Promise<any> {
    return (await getDummyStore()).get(key, form as any)
  }

  async put(key: string, value: string, options?: any) {
    return (await getDummyStore()).put(key, value, options)
  }

  async delete(key: string) {
    return (await getDummyStore()).delete(key)
  }
}


class KVStoreClient {
  get STORE() {
    if (!env.STORE && dev) {
      env.STORE = new DummyStore() as any as KVNamespace
    }
    return env.STORE!
  }

  async getText(key: string): Promise<string | null> {
    return await this.STORE.get(key, "text")
  }

  async getJson<T>(key: string): Promise<T | null> {
    return await this.STORE.get(key, "json")
  }

  async putText(
    key: string,
    value: string,
    // expirationTtl is in seconds
    options?: { expirationTtl?: number }
  ) {
    if (options?.expirationTtl) {
      options = { expirationTtl: options.expirationTtl }
    }
    return await this.STORE.put(key, value, options)
  }

  async putJson(
    key: string,
    value: Record<string, any>,
    options?: { expirationTtl?: number }
  ) {
    if (options?.expirationTtl) {
      options = { expirationTtl: options.expirationTtl }
    }
    await this.STORE.put(key, JSON.stringify(value), options)
  }

  async delete(key: string) {
    try {
      await this.STORE.delete(key)
    } catch (err) {
      // We don't really care that much about errors in deletion
      console.error(err)
    }
  }
}

export const kvs = new KVStoreClient()
