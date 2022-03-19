import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"
import * as z from 'zod'

export const get: RequestHandler = async ({ locals }) => {
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session!.userId),
    db.progress.listAllFor(locals.session!.userId)
  ])
  return {
    status: 200,
    body: { user, progressItems }
  }
}

const progressReport = z.object({
  patternId: z.string(),
  level: z.number()
})
export const post: RequestHandler = async ({ request, locals }) => {
  const { patternId, level } = progressReport.parse(await request.json())
  const progressItem = await db.progress.completeLevel(locals.session!.userId, patternId, level)
  return {
    status: 200,
    body: progressItem
  }
}