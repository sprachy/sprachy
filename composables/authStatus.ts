export class AuthStatus {
  loading = true
  user: null | User = null

  async refresh() {
    const res = await $fetch('/api/whoami')
    if (res.status === 'user') {
      this.user = res.user
    }
    this.loading = false
  }

}

export const authStatus = defineState(new AuthStatus())