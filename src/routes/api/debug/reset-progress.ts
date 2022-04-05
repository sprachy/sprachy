import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

export const post: RequestHandler = async ({ request, locals }) => {
  if (!locals.session)
    return { status: 401 }

  await db.progress.resetFor(locals.session.userId)
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session.userId),
    db.progress.listAllFor(locals.session.userId)
  ])
  return {
    status: 200,
    body: { user, progressItems }
  }
}