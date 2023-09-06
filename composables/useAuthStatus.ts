const auth = defineState({
  loading: true,
  user: null as null | User
})

let loadingPromise: Promise<void>

async function loadAuthStatus() {
  const res = await $fetch('/api/whoami')
  if (res.status === 'user') {
    auth.user = res.user
  }
  auth.loading = false
}

export function useAuthStatus() {
  if (!loadingPromise) {
    loadingPromise = loadAuthStatus()
  }

  return auth
}