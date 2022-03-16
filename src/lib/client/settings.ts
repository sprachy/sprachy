/**
 * Settings for the client-side code, which may be based on env variables
 * passed through at build time by webpack.EnvironmentPlugin.
 */

/** True if this code was emitted from a production webpack build (should always be true for both live and staging) */
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production' ? true : false
