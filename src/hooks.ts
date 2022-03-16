import cookie from 'cookie'
import type { Handle, GetSession } from '@sveltejs/kit'
import { sessions } from './server/sessions'

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

  // Goes through to all the different route endpoints
  const response = await resolve(event)

  // if (!cookies.userid) {
  //   // if this is the first time the user has visited this app,
  //   // set a cookie so that we recognise them when they return
  //   response.headers.set(
  //     'set-cookie',
  //     cookie.serialize('userid', event.locals.userid, {
  //       path: '/',
  //       httpOnly: true
  //     })
  //   )
  // }

  return response
}

/** Client-side session */
export const getSession: GetSession = async (event) => {
  return {}
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