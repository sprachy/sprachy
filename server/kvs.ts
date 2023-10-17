export class KVStoreClient {
  constructor(readonly STORE: KVNamespace) { }

  async getText(key: string): Promise<string | null> {
    return this.STORE.get(key, "text")
  }

  async getJson<T>(key: string): Promise<T | null> {
    return this.STORE.get(key, "json")
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
    return this.STORE.put(key, value, options)
  }

  async putJson(
    key: string,
    value: Record<string, any>,
    options?: { expirationTtl?: number }
  ) {
    if (options?.expirationTtl) {
      options = { expirationTtl: options.expirationTtl }
    }
    return this.STORE.put(key, JSON.stringify(value), options)
  }

  async delete(key: string) {
    try {
      return this.STORE.delete(key)
    } catch (err) {
      // We don't really care that much about errors in deletion
      console.error(err)
    }
  }
}

let _kvs: KVStoreClient
export async function getKVStore(event: Parameters<Parameters<typeof defineEventHandler>[0]>[0]) {
  if (!_kvs) {
    if (process.dev) {
      const { Miniflare } = await import("miniflare")
      const namespace = process.env.TESTING ? "TESTSTORE" : "STORE"
      const mf = new Miniflare({
        script: "",
        kvNamespaces: [namespace],
        kvPersist: true
      })
      const STORE = await mf.getKVNamespace(namespace) as any as KVNamespace
      _kvs = new KVStoreClient(STORE)
    } else {
      const { cloudflare } = event.context
      _kvs = new KVStoreClient(cloudflare.env.STORE)
    }
  }
  return _kvs
}