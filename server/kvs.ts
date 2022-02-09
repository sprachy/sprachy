declare const STORE: KVNamespace

class KVStoreClient {
  async getText(key: string): Promise<string | null> {
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
