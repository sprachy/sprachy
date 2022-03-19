import cookie from 'cookie'
import type { Handle, GetSession } from '@sveltejs/kit'
import { sessions } from '$lib/server/sessions'
import { DummyStore } from "$lib/server/kvs"
import { ZodError } from 'zod'
import { dev, prerendering } from '$app/env'
import { _settings } from "$lib/server/settings"

/**
 * All requests to the server are wrapped by this hook.
 * Define middleware here.
 */
export const handle: Handle = async ({ event, resolve }) => {
  if (dev) {
    // Mock Cloudflare platform functionality in dev
    event.platform = {
      env: {
        FRONTEND_BASE_URL: "http://localhost:5999",
        ...process.env,
        STORE: new DummyStore() as any as KVNamespace,
      },
      context: {
        // Just a no-op in dev
        waitUntil: async (promise: Promise<any>) => { return promise }
      }
    }
  }

  let env: Partial<App.SprachyEnvironment> = {}
  if (prerendering) {
    env = {
      FRONTEND_BASE_URL: "https://sprachy.com"
    }
  } else {
    env = event.platform.env
  }

  // Double check some environment variables
  const { FRONTEND_BASE_URL, STORE, FAUNA_ADMIN_KEY, MAILGUN_SECRET, DISCORD_SIGNUP_WEBHOOK } = env

  if (!FRONTEND_BASE_URL) {
    throw new Error("No FRONTEND_BASE_URL set; Sprachy doesn't know how to make links")
  }

  if (!prerendering && !STORE) {
    throw new Error("Couldn't access KV STORE; can't store sessions")
  }

  if (!prerendering && !FAUNA_ADMIN_KEY) {
    throw new Error("No FAUNA_ADMIN_KEY set; can't connect to db")
  }

  // Put the environment variables into globally accessible settings
  const filledSettings: App.SprachyEnvironment = {
    STORE,
    FAUNA_ADMIN_KEY,
    FRONTEND_BASE_URL,
    MAILGUN_SECRET,
    DISCORD_SIGNUP_WEBHOOK
  }
  Object.assign(_settings, filledSettings)
  event.locals.env = _settings

  // Look up the userId matching any sessionKey in the request's cookie
  // This is how we identify a logged in user for all requests
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  const sessionKey = cookies['sprachySessionKey']
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.locals.session = session

  // If it's an api route, we need to auth gate it here
  if (event.url.pathname.startsWith('/api') && !session) {
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
  }

  try {
    const ssr = !session
    const response = await resolve(event, { ssr })
    return response
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