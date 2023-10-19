import * as z from 'zod'
import { getDatabase, schema } from '~/db'
import { and, eq } from 'drizzle-orm'
import { omit } from 'lodash-es'

const syncProgressSchema = z.object({
  progressItems: z.array(z.object({
    patternId: z.string(),
    initiallyLearnedAt: z.number(),
    lastExperienceGainAt: z.number(),
    experience: z.number()
  }))
}).optional().default(() => ({ progressItems: [] }))

export type SyncProgressSchema = z.infer<typeof syncProgressSchema>

export default defineEventHandler(async (event) => {
  const { progressItems: newProgressItems } = syncProgressSchema.parse(await readBody(event))
  const db = await getDatabase(event)
  const { userId } = event.context.session

  const existingProgressItems = await db.query.progressItems.findMany({
    where: eq(schema.progressItems.userId, userId)
  })

  const progressItemsByPatternId: Record<string, Omit<ProgressItem, 'userId'>> = {}
  for (const item of existingProgressItems) {
    progressItemsByPatternId[item.patternId] = omit(item, 'userId')
  }

  // Find any new or updated progress and prepare to store it
  const itemsToInsert: ProgressItem[] = []
  const itemsToUpdate: ProgressItem[] = []
  for (const newItem of newProgressItems) {
    const existingItem = progressItemsByPatternId[newItem.patternId]
    if (!existingItem) {
      const itemToInsert = { userId, ...newItem }
      progressItemsByPatternId[newItem.patternId] = newItem
      itemsToInsert.push(itemToInsert)
    } else if (newItem.experience > existingItem.experience) {
      const itemToUpdate = { userId, ...existingItem }
      itemToUpdate.experience = newItem.experience
      itemToUpdate.lastExperienceGainAt = newItem.lastExperienceGainAt
      itemsToUpdate.push(itemToUpdate)
    }
  }

  // Push changes to database as needed
  const operations: Promise<any>[] = []
  if (itemsToInsert.length) {
    operations.push(db.insert(schema.progressItems).values(itemsToInsert).execute())
  }
  if (itemsToUpdate.length) {
    operations.push(
      ...itemsToUpdate.map(
        item => db.update(schema.progressItems).set(item).where(
          and(
            eq(schema.progressItems.userId, userId),
            eq(schema.progressItems.patternId, item.patternId)
          )).execute()
      )
    )
  }
  await Promise.all(operations)


  return {
    progressItems: Object.values(progressItemsByPatternId)
  }
})