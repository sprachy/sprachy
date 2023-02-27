import { db } from "../db"
import { sessions } from "../sessions"

export default defineEventHandler(async (event) => {
  const sessionKey = getCookie(event, 'sprachySessionKey')
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.context.session = session

  // I don't know when/why this could be undefined, but let's make sure it's not
  if (!event.path) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
    })
  }

  // Whitelist public API routes, require auth for the rest
  const publicApiRoutes = [
    '/api/login',
    '/api/logout',
    '/api/signup',
    '/api/reset-password',
    '/api/confirm-reset-password',
    '/api/whoami',
  ]

  // Allow non-authed translation for scripts
  if (process.dev) {
    publicApiRoutes.push('/api/translate')
  }

  if (!session && event.path.startsWith('/api') && !publicApiRoutes.includes(event.path) && !event.path.startsWith('/api/_content')) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  } else if (event.path.startsWith(`/api/admin`)) {
    const user = await db.users.get(session!.userId)
    if (!user?.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
      })
    }
  }
})
