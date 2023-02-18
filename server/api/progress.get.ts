import { db } from "~/server/db"
import { sessions } from '~/server/sessions'

export default defineEventHandler(async (event) => {
  const { session } = event.context

  const [user, progressItems] = await Promise.all([
    db.users.get(session!.userId),
    db.progress.listAllFor(session!.userId)
  ])

  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(session!.sessionKey)
    throw createError({
      statusCode: 401,
      statusMessage: 'Login required'
    })
  }

  return {}
})