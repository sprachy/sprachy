const env: any = (typeof process !== "undefined") ? process.env : global

export const FRONTEND_BASE_URL: string = env.FRONTEND_BASE_URL || ""

export const IS_PRODUCTION: boolean = !!FRONTEND_BASE_URL && !FRONTEND_BASE_URL.includes("localhost")

// @ts-ignore
export const IS_TESTING: boolean = env.IS_TESTING || false

export const MAILGUN_SECRET: string = env.MAILGUN_SECRET || ""

export const DISCORD_SIGNUP_WEBHOOK: string = env.DISCORD_SIGNUP_WEBHOOK || ""
