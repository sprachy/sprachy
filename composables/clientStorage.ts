
/**
 * Wrapper around browser localStorage providing JSON conversion
 * and context availability checks.
 */
class ClientStorage {
  available = typeof window !== "undefined" && !!window.localStorage;

  getJSON<T>(key: string): Partial<T> | null {
    if (!this.available) return null

    const result = window.localStorage.getItem(key)
    if (result === null)
      return null

    try {
      return JSON.parse(result)
    } catch (err) {
      return null
    }
  }

  setJSON(key: string, obj: any) {
    if (!this.available) return null

    window.localStorage.setItem(key, JSON.stringify(obj))
  }

  deleteJSON(key: string) {
    if (!this.available) return null

    window.localStorage.removeItem(key)
  }
}

export const clientStorage = new ClientStorage()