/**
 * On the Cloudflare Workers runtime, secrets are injected as global variables.
 * In node scripts, we get them from process.env.
 */
const env = (typeof global === "undefined") ? global : process.env

export const FAUNA_ADMIN_KEY = env.FAUNA_ADMIN_KEY as string