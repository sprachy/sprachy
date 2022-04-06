import cookie from 'cookie'
import type { Handle, GetSession } from '@sveltejs/kit'
import { sessions } from '$lib/server/sessions'
import { DummyStore } from "$lib/server/kvs"
import { ZodError } from 'zod'
import { dev, prerendering } from '$app/env'
import { prepareSettings, _settings } from "$lib/server/settings"
import { getCloudflareWorkersEnv } from "./workersEnv"
import { isAuthedRoute } from '$lib/routing'
import { db } from '$lib/server/db'

/**
 * All requests to the server are wrapped by this hook.
 * Define middleware here.
 */
export const handle: Handle = async ({ event, resolve }) => {
  let env: Partial<App.SprachyEnvironment> = {}

  if (dev) {
    env = {
      FRONTEND_BASE_URL: "http://localhost:5999",
      ...process.env,
      STORE: new DummyStore() as any as KVNamespace,
    }

    // Mock Cloudflare platform functionality in dev
    event.platform = {
      context: {
        // Just a no-op in dev
        waitUntil: async (promise: Promise<any>) => { return promise }
      }
    } as any
  } else if (prerendering) {
    env = {
      FRONTEND_BASE_URL: "https://sprachy.com"
    }
  } else {
    env = getCloudflareWorkersEnv()
  }

  prepareSettings(env)
  event.locals.env = _settings as App.SprachyEnvironment

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
    if (session && isAuthedRoute(event.url.pathname)) {
      return await resolve(event, { ssr: false })
    } else {
      return await resolve(event)
    }
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
}

// export const handleError: HandleError = async ({ error, event }) => {
//   console.log("humm")
//   console.error(error)
// }