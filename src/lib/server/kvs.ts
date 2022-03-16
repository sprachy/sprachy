

import { Miniflare } from "miniflare"

async function getStore() {
  const mf = new Miniflare({
    script: "",
    kvNamespaces: ["STORE"],
    kvPersist: true
  })
  return mf.getKVNamespace("STORE")
}

class DummyStore {
  data: Record<string, string> = {}

  async get(key: string, form: "text" | "json"): Promise<any> {
    return (await getStore()).get(key, form as any)
  }

  async put(key: string, value: string, options?: any) {
    return (await getStore()).put(key, value, options)
  }

  async delete(key: string) {
    return (await getStore()).delete(key)
  }
}

const STORE = new DummyStore()

class KVStoreClient {
  async getText(key: string): Promise<string | null> {
    console.log(STORE)
    return await STORE.get(key, "text")
  }

  async getJson<T>(key: string): Promise<T | null> {
    return await STORE.get(key, "json")
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
    return await STORE.put(key, value, options)
  }

  async putJson(
    key: string,
    value: Record<string, any>,
    options?: { expirationTtl?: number }
  ) {
    if (options?.expirationTtl) {
      options = { expirationTtl: options.expirationTtl }
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

export const kvs = new KVStoreClient()
