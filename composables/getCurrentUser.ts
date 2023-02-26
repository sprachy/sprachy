import type { ProgressSummary } from "~/lib/types"

let authStatus: { status: 'user', summary: ProgressSummary } | { status: 'guest' } | null = null

/**
 * Retrieves the current logged in user (if any) and their progress details.
 * Can be used on both server and client.
 * 
 * If called on the client, will query the API the first time
 * and then cache the result.
 */
export async function getProgressSummary() {
  if (process.server) {
    const result = await api.get('/api/whoami')
    if (result.status === 'user') {
      return result.summary
    } else {
      return null
    }
  } else {
    if (!authStatus) {
      authStatus = await api.get('/api/whoami')
    }

    if (authStatus.status === 'guest') {
      return null
    } else {
      return authStatus.summary
    }
  }
}

export async function getCurrentUser() {
  return (await getProgressSummary())?.user
}