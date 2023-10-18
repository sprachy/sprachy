import * as z from 'zod'
import { getDatabase, schema } from '~/db'
import { and, eq } from 'drizzle-orm'

const syncProgressSchema = z.object({
  progressItems: z.array(z.object({
    patternId: z.string(),
    initiallyLearnedAt: z.number(),
    lastExperienceGainAt: z.number(),
    experience: z.number()
  }))
})

export type SyncProgressSchema = z.infer<typeof syncProgressSchema>

export default defineEventHandler(async (event) => {
  const { progressItems: newProgressItems } = syncProgressSchema.parse(await readBody(event))
  const db = await getDatabase(event)
  const { userId } = event.context.session

  const existingProgressItems = await db.query.progressItems.findMany({
    where: eq(schema.progressItems.userId, userId)
  })

  const progressItemsByPatternId: Record<string, ProgressItem> = {}
  for (const item of existingProgressItems) {
    progressItemsByPatternId[item.patternId] = item
  }

  const itemsToInsert: ProgressItem[] = []
  const itemsToUpdate: ProgressItem[] = []
  for (const newItem of newProgressItems) {
    const existingItem = progressItemsByPatternId[newItem.patternId]
    if (!existingItem) {
      const itemToInsert = { userId, ...newItem }
      progressItemsByPatternId[newItem.patternId] = { userId, ...newItem }
      itemsToInsert.push(itemToInsert)
    } else {
      const itemToUpdate = { ...existingItem }

      if (newItem.experience > existingItem.experience) {
        itemToUpdate.experience = newItem.experience
        itemToUpdate.lastExperienceGainAt = newItem.lastExperienceGainAt
      }

      itemsToUpdate.push(itemToUpdate)
    }
  }

  await Promise.all([
    db.insert(schema.progressItems).values(itemsToInsert).execute(),
    ...itemsToUpdate.map(
      item => db.update(schema.progressItems).set(item).where(
        and(
          eq(schema.progressItems.userId, userId),
          eq(schema.progressItems.patternId, item.patternId)
        )).execute()
    )
  ])
  return {
    progressItems: Object.values(progressItemsByPatternId)
  }
})