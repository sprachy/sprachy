import { FetchError } from 'ofetch'
import type { LoginSchema } from "~/server/api/login.post"
import type { ResetPasswordSchema } from "~/server/api/reset-password.post"
import type { ConfirmResetPasswordSchema } from "~/server/api/confirm-reset-password.post"
import type { VoiceSynthesisSchema } from '~/server/api/synthesize.post'
import type { ReportProgressSchema } from '~/server/api/progress.post'
import type { SignupSchema } from '~/server/api/signup.post'

class SprachyAPI {
  async login(opts: LoginSchema) {
    return await $fetch('/api/login', { method: 'POST', body: opts })
  }

  async logout() {
    return await $fetch('/api/logout', { method: 'POST' })
  }

  async signup(opts: SignupSchema) {
    return await $fetch('/api/signup', { method: 'POST', body: opts })
  }
  w
  async sendPasswordResetEmail(opts: ResetPasswordSchema) {
    return await $fetch(`/api/reset-password`, { method: 'POST', body: opts })
  }

  async confirmPasswordReset(opts: ConfirmResetPasswordSchema) {
    return await $fetch(`/api/confirm-reset-password`, { method: 'POST', body: opts })
  }

  async synthesizeSpeech(opts: VoiceSynthesisSchema) {
    return await $fetch(`/api/synthesize`, { method: 'POST', body: opts })
  }

  async reportProgress(opts: ReportProgressSchema) {
    return await $fetch(`/api/progress`, { method: 'POST', body: opts })
  }

  async whoami(): Promise<{ status: 'guest' } | { status: 'user', user: User, progressItems: ProgressItem[] }> {
    return await $fetch(`/api/whoami`)
  }
}

export const api = new SprachyAPI()
export { FetchError }
