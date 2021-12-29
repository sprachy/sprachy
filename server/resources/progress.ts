import type { ProgressItem, ProgressSummary } from "../../common/api"
import type { SessionRequest } from "../middleware"
import { db } from "../db"
import * as z from 'zod'
import time from "../../common/time"

export async function getSummary(req: SessionRequest): Promise<ProgressSummary> {
  const [user, progressItems] = await Promise.all([
    db.users.expect(req.session.userId),
    db.progress.listAllFor(req.session.userId)
  ])
  return { user, progressItems }
}

const progressReport = z.object({
  patternId: z.string(),
  level: z.number()
})
export async function completeLevel(req: SessionRequest): Promise<ProgressItem | null> {
  const { patternId, level } = progressReport.parse(await req.body())
  return await db.progress.completeLevel(req.session.userId, patternId, level)
}

export async function resetProgress(req: SessionRequest): Promise<ProgressSummary> {
  await db.progress.resetFor(req.session.userId)
  return getSummary(req)
}

export async function debugTimeskip(req: SessionRequest): Promise<ProgressSummary> {
  const items = await db.progress.listAllFor(req.session.userId)
  await Promise.all(items.map(item => {
    return db.progress.update(item.id, { lastLeveledAt: item.lastLeveledAt - time.toNextSRSLevel(item.srsLevel) })
  }))
  return getSummary(req)
}