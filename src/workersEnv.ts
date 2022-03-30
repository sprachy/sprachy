declare const FRONTEND_BASE_URL: string
declare const STORE: KVNamespace
declare const FAUNA_ADMIN_KEY: string
declare const MAILGUN_SECRET: string
declare const DISCORD_SIGNUP_WEBHOOK: string

export function getCloudflareWorkersEnv() {
  return {
    FRONTEND_BASE_URL: typeof FRONTEND_BASE_URL !== "undefined" ? FRONTEND_BASE_URL : "",
    STORE: typeof STORE !== "undefined" ? STORE : undefined,
    FAUNA_ADMIN_KEY: typeof FAUNA_ADMIN_KEY !== "undefined" ? FAUNA_ADMIN_KEY : "",
    MAILGUN_SECRET: typeof MAILGUN_SECRET !== "undefined" ? MAILGUN_SECRET : "",
    DISCORD_SIGNUP_WEBHOOK: typeof DISCORD_SIGNUP_WEBHOOK !== "undefined" ? DISCORD_SIGNUP_WEBHOOK : ""
  }
}
