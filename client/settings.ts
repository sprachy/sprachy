/**
 * Settings for the client-side code, which may be based on env variables
 * passed through at build time by webpack.EnvironmentPlugin.
 */

/** True if this code was emitted from a production webpack build (should always be true for both live and staging) */
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production' ? true : false

/**
 * The floorcheck API url for all requests. In order to avoid CORS issues, this should
 * always be a url with the same origin as the frontend is being served from.
 *
 * We make that work by proxying with Netlify _redirects (in production), or with
 * webpack devServer configuration (in development).
 **/
export const API_BASE_URL: string = typeof window !== "undefined" ? window.location.origin + '/api' : ""