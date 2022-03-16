/**
 * On the Cloudflare Workers runtime, secrets are injected as global variables.
 * In node scripts, we get them from process.env.
 */
const env: any = (typeof process.env !== "undefined") ? process.env : global

export const FAUNA_ADMIN_KEY: string = env.FAUNA_ADMIN_KEY || ""  