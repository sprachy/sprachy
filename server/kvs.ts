import { env } from "./env"

declare global {
  const STORE: KVNamespace
}

let devStore: KVNamespace

async function getKVNamespace() {
  if (process.dev) {
    if (!devStore) {
      const { Miniflare } = await import("miniflare")
      const namespace = env.TESTING ? "TESTSTORE" : "STORE"
      const mf = new Miniflare({
        script: "",
        kvNamespaces: [namespace],
        kvPersist: true
      })
      devStore = await mf.getKVNamespace(namespace) as any as KVNamespace
    }
    return devStore
  } else {
    return STORE
  }
}

class KVStoreClient {
  async getText(key: string): Promise<string | null> {
    return (await getKVNamespace()).get(key, "text")
  }

  async getJson<T>(key: string): Promise<T | null> {
    return (await getKVNamespace()).get(key, "json")
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
    return (await getKVNamespace()).put(key, value, options)
  }

  async putJson(
    key: string,
    value: Record<string, any>,
    options?: { expirationTtl?: number }
  ) {
    if (options?.expirationTtl) {
      options = { expirationTtl: options.expirationTtl }
    }
    return (await getKVNamespace()).put(key, JSON.stringify(value), options)
  }

  async delete(key: string) {
    try {
      return (await getKVNamespace()).delete(key)
    } catch (err) {
      // We don't really care that much about errors in deletion
      console.error(err)
    }
  }
}

export const kvs = new KVStoreClient()
