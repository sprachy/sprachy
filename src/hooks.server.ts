import cookie from 'cookie'
import type { Handle } from '@sveltejs/kit'
import { sessions } from '$lib/server/sessions'
import { ZodError } from 'zod'
import { isAuthedRoute } from '$lib/routing'
import { db } from '$lib/server/db'
import { env } from '$lib/server/env'
import _ from 'lodash'

/**
 * All requests to the server are wrapped by this hook.
 * Define middleware here.
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Will become platform.env at some point when adapter-cloudflare-workers
  // is updated or we move back to Pages
  Object.assign(env, event.platform?.env || {}, Object.assign({}, env))

  // Look up the userId matching any sessionKey in the request's cookie
  // This is how we identify a logged in user for all requests
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  const sessionKey = cookies['sprachySessionKey']
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.locals.session = session

  if (event.url.pathname.startsWith(`/pattern/`)) {
    return new Response("", {
      status: 302,
      headers: {
        location: `/${event.url.pathname.split("/pattern/")[1]}`
      }
    })
  }

  // If it's an api route, we need to auth gate it here
  const publicApiRoutes = [
    '/api/login',
    '/api/signup',
    '/api/reset-password',
    '/api/confirm-reset-password'
  ]
  if (!session && event.url.pathname.startsWith('/api') && !publicApiRoutes.includes(event.url.pathname)) {
    const json = { status: 401, code: "login required" }
    return new Response(
      JSON.stringify(json),
      {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        }
      }
    )
  } else if (event.url.pathname.startsWith(`/api/admin`)) {
    const user = await db.users.get(session!.userId)
    if (!user?.isAdmin) {
      const json = { status: 403, code: "admin required" }
      return new Response(
        JSON.stringify(json),
        {
          status: 403,
          statusText: "Forbidden",
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          }
        }
      )
    }
  }

  try {
    return await resolve(event)
  } catch (err: any) {
    if (err instanceof ZodError) {
      const json = { status: 422, code: "validation failed", errors: err.issues }
      return new Response(
        JSON.stringify(json),
        {
          status: 422,
          statusText: "Unprocessable Entity",
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          }
        }
      )
    } else {
      throw err
    }
  }
}

// /** Client-side session */
// export const getSession: GetSession = async (event) => {
//   const { session } = event.locals
//   if (session) {
//     return {
//       userId: session.userId
//     }
//   } else {
//     return {}
//   }
// }

// export const handleError: HandleError = async ({ error, event }) => {
//   console.log("humm")
//   console.error(error)
// }