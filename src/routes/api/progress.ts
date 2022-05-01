import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"
import * as z from 'zod'
import { sessions } from "$lib/server/sessions"

export const get: RequestHandler = async ({ locals }) => {
  const [user, progressItems] = await Promise.all([
    db.users.get(locals.session!.userId),
    db.progress.listAllFor(locals.session!.userId)
  ])

  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(locals.session!.sessionKey)
    return {
      status: 401,
      body: {
        status: 401,
        code: 'login required'
      }
    }
  }

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