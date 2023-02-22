import { FetchError } from 'ofetch'
import type { UseFetchOptions } from "nuxt/dist/app"
import type { LoginForm } from "~/server/api/login.post"
import type { ResetPasswordForm } from "~/server/api/reset-password.post"
import type { ConfirmResetPasswordForm } from "~/server/api/confirm-reset-password.post"

class SprachyAPI {
  async get<T extends string>(url: T) {
    const { data } = await useFetch(url)
    return data.value!
  }

  async post<T extends string>(url: T, body: UseFetchOptions<T>['body'], options?: UseFetchOptions<T>) {
    const { data } = await useFetch(url, Object.assign({ method: 'POST', body }, options))
    return data.value!
  }

  async login(opts: LoginForm) {
    return await $fetch('/api/login', { method: 'POST', body: opts })
  }

  async logout() {
    return await $fetch('/api/logout', { method: 'POST' })
  }

  async sendPasswordResetEmail(opts: ResetPasswordForm) {
    return await $fetch(`/api/reset-password`, { method: 'POST', body: opts })
  }

  async confirmPasswordReset(opts: ConfirmResetPasswordForm) {
    return await $fetch(`/api/confirm-reset-password`, { method: 'POST', body: opts })
  }
}

export const api = new SprachyAPI()
export { FetchError }
