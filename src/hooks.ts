import cookie from 'cookie'
import type { Handle, GetSession, HandleError } from '@sveltejs/kit'
import { sessions } from '$lib/server/sessions'
import { isAuthedRoute } from '$lib/routing'

/**
 * All requests to the server are wrapped by this hook.
 * Define middleware here.
 */
export const handle: Handle = async ({ event, resolve }) => {
  // Look up the userId matching any sessionKey in the request's cookie
  // This is how we identify a logged in user for all requests
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  const sessionKey = cookies['sessionKey']
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.locals.session = session

  // If it's an api route, we need to auth gate it here
  if (event.url.pathname.startsWith('/api') && !session) {
    return new Response(null,
      {
        status: 401,
        statusText: "Unauthorized"
      }
    )
  }

  const ssr = !session
  const response = await resolve(event, { ssr })
  return response
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