import { FetchError } from 'ofetch'
import type { UseFetchOptions } from "nuxt/dist/app"
import type { LoginSchema } from "~/server/api/login.post"
import type { ResetPasswordSchema } from "~/server/api/reset-password.post"
import type { ConfirmResetPasswordSchema } from "~/server/api/confirm-reset-password.post"
import type { VoiceSynthesisSchema } from '~/server/api/synthesize.post'

class SprachyAPI {
  async get<T extends string>(url: T) {
    const { data } = await useFetch(url)
    return data.value!
  }

  async post<T extends string>(url: T, body: UseFetchOptions<T>['body'], options?: UseFetchOptions<T>) {
    const { data } = await useFetch(url, Object.assign({ method: 'POST', body }, options))
    return data.value!
  }

  async login(opts: LoginSchema) {
    return await $fetch('/api/login', { method: 'POST', body: opts })
  }

  async logout() {
    return await $fetch('/api/logout', { method: 'POST' })
  }

  async sendPasswordResetEmail(opts: ResetPasswordSchema) {
    return await $fetch(`/api/reset-password`, { method: 'POST', body: opts })
  }

  async confirmPasswordReset(opts: ConfirmResetPasswordSchema) {
    return await $fetch(`/api/confirm-reset-password`, { method: 'POST', body: opts })
  }

  async synthesizeSpeech(opts: VoiceSynthesisSchema) {
    return await $fetch(`/api/synthesize`, { method: 'POST', body: opts })
  }
}

export const api = new SprachyAPI()
export { FetchError }
