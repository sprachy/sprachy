import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { time } from "$lib/time"

export const post: RequestHandler = async ({ request, locals }) => {
  if (!locals.session)
    return { status: 401 }

  const items = await db.progress.listAllFor(locals.session.userId)
  await Promise.all(items.map(item => {
    return db.progress.update(item.id, { lastLeveledAt: item.lastLeveledAt - time.toNextSRSLevel(item.srsLevel) })
  }))
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session.userId),
    db.progress.listAllFor(locals.session.userId)
  ])
  return {
    status: 200,
    body: { user, progressItems }
  }
}