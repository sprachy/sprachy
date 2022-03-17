import cookie from 'cookie'
import type { Handle, GetSession, HandleError } from '@sveltejs/kit'
import { sessions } from '$lib/server/sessions'
import { isAuthedRoute } from '$lib/routing'
import { kvs } from "$lib/server/kvs"
import { ZodError } from 'zod'

/**
 * All requests to the server are wrapped by this hook.
 * Define middleware here.
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Configure KV store in production
  if (event.platform) {
    kvs.STORE = event.platform.env.STORE
  }

  // Look up the userId matching any sessionKey in the request's cookie
  // This is how we identify a logged in user for all requests
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  const sessionKey = cookies['sprachySessionKey']
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.locals.session = session

  // If it's an api route, we need to auth gate it here
  if (event.url.pathname.startsWith('/api') && !session) {
    // new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    return new Response(null,
      {
        status: 401,
        statusText: "Unauthorized"
      }
    )
  }

  try {
    const ssr = !session
    const response = await resolve(event, { ssr })
    return response
  } catch (err: any) {
    if (err instanceof ZodError) {
      const json = { status: 422, code: "validation failed", errors: err.issues }
      return new Response(
        new Blob([JSON.stringify(json)], { type: 'application/json ' }),
        {
          status: 422,
          statusText: "Unprocessable Entity"
        }
      )
    }
  }
}

/** Client-side session */
export const getSession: GetSession = async (event) => {
  const { session } = event.locals
  if (session) {
    return {
      userId: session.userId
    }
  } else {
    return {}
  }
  // const { session } = event.locals
  // if (session) {
  //   const [user, progressItems] = await Promise.all([
  //     db.users.expect(session.userId),
  //     db.progress.listAllFor(session.userId)
  //   ])

  //   return { user, progressItems }
  // } else {
  //   return {}
  // }
  // return event.locals.user
  //   ? {
  //     user: {
  //       // only include properties needed client-side —
  //       // exclude anything else attached to the user
  //       // like access tokens etc
  //       name: event.locals.user.name,
  //       email: event.locals.user.email,
  //       avatar: event.locals.user.avatar
  //     }
  //   }
  //   : {}
}

// export const handleError: HandleError = async ({ error, event }) => {
//   console.log("humm")
//   console.error(error)
// }