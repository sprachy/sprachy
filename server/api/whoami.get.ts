import { db } from "~/server/db"
import { sessions } from '~/server/sessions'
import { ProgressSummary } from '~/lib/types'

export default defineEventHandler(async function whoami(event): Promise<{ status: 'guest' } | { status: 'user', summary: ProgressSummary }> {
  const { session } = event.context

  if (!session) {
    return { status: 'guest' }
  }

  const [user, progressItems] = await Promise.all([
    db.users.get(session.userId),
    db.progress.listAllFor(session.userId)
  ])

  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(session.sessionKey)
    return { status: 'guest' }
  }

  return {
    status: 'user',
    summary: { user, progressItems }
  }
})