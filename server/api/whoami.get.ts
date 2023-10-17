import { getSessionStore } from '~/server/sessions'
import { getDatabase } from '~/db'

export default defineEventHandler(async function whoami(event): Promise<{ status: 'guest' } | { status: 'user', user: UserWithProgress }> {
  const { session } = event.context

  if (!session) {
    return { status: 'guest' }
  }

  const db = await getDatabase(event)
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.userId),
    columns: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      isAdmin: true
    }
  })


  if (!user) {
    // Invalid session, e.g. when the user was deleted
    const sessions = await getSessionStore(event)
    await sessions.expire(session.sessionKey)
    return { status: 'guest' }
  }

  return {
    status: 'user',
    user
  }
})