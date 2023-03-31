let authStatus: { status: 'user', user: UserWithProgress } | { status: 'guest' } | null = null

/**
 * Retrieves the current logged in user (if any) and their progress details.
 * Can be used on both server and client.
 * 
 * If called on the client, will query the API the first time
 * and then cache the result.
 */
export async function getCurrentUser() {
  if (process.server) {
    const result = await $fetch('/api/whoami')
    if (result.status === 'user') {
      return result.user
    } else {
      return null
    }
  } else {
    if (!authStatus) {
      authStatus = await $fetch('/api/whoami')
    }

    if (authStatus.status === 'guest') {
      return null
    } else {
      return authStatus.user
    }
  }
}