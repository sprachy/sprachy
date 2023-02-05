import { db } from "../db"
import { sessions } from "../sessions"

export default defineEventHandler(async (event) => {
  const sessionKey = getCookie(event, 'sprachySessionKey')
  const session = sessionKey ? await sessions.get(sessionKey) : null
  event.context.session = session

  // If it's an api route, we need to auth gate it here
  const publicApiRoutes = [
    '/api/login',
    '/api/signup',
    '/api/reset-password',
    '/api/confirm-reset-password'
  ]
  if (!session && event.path?.startsWith('/api') && !publicApiRoutes.includes(event.path)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  } else if (event.path?.startsWith(`/api/admin`)) {
    const user = await db.users.get(session!.userId)
    if (!user?.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden",
      })
    }
  }
})
