const env: any = (typeof process !== "undefined") ? process.env : global

export const IS_PRODUCTION: boolean = env.FRONTEND_BASE_URL && !env.FRONTEND_BASE_URL.includes("localhost")
