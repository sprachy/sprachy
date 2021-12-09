import type { ProgressItem, ProgressSummary } from "../../common/api"
import type { SessionRequest } from "../middleware"
import { db } from "../db"
import * as z from 'zod'

export async function getSummary(req: SessionRequest): Promise<ProgressSummary> {
  const [user, progressItems] = await Promise.all([
    db.users.expect(req.session.userId),
    db.progress.listAllFor(req.session.userId)
  ])
  return { user, progressItems }
}

const progressReport = z.object({
  patternId: z.string(),
  remembered: z.boolean()
})
export async function recordReview(req: SessionRequest): Promise<ProgressItem | null> {
  const { patternId, remembered } = progressReport.parse(await req.body())
  return await db.progress.recordReview(req.session.userId, patternId, remembered)
}