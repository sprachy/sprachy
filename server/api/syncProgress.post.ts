import * as z from 'zod'
import { getDatabase, schema, type DrizzleSqliteDB } from '~/db'
import { and, eq } from 'drizzle-orm'
import { keyBy, omit } from 'lodash-es'
import { combineProgress } from '~/lib/progress'

export const progressItemSchema = z.object({
  patternId: z.string(),
  initiallyLearnedAt: z.number(),
  lastExperienceGainAt: z.number(),
  experience: z.number()
})

const syncProgressSchema = z.object({
  progressItems: z.array(progressItemSchema)
}).optional().default(() => ({ progressItems: [] }))

export type SyncProgressSchema = z.infer<typeof syncProgressSchema>

export async function syncProgress(db: DrizzleSqliteDB, userId: number, newProgressItems: ProgressItem[]) {
  const existingProgressItems = await db.query.progressItems.findMany({
    where: eq(schema.progressItems.userId, userId),
    columns: {
      patternId: true,
      initiallyLearnedAt: true,
      lastExperienceGainAt: true,
      experience: true
    }
  })

  const existingProgressItemsByPatternId = keyBy(existingProgressItems, 'patternId')

  const combinedProgressItems = combineProgress(existingProgressItems, newProgressItems)

  // Prepare items for the database
  const itemsToInsert: DBProgressItem[] = []
  const itemsToUpdate: DBProgressItem[] = []
  for (const item of combinedProgressItems) {
    const existingItem = existingProgressItemsByPatternId[item.patternId]
    if (!existingItem) {
      itemsToInsert.push({ userId, ...item })
    } else if (item.experience > existingItem.experience) {
      itemsToUpdate.push({ userId, ...item })
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
}

export default defineEventHandler(async (event) => {
  const { progressItems: newProgressItems } = syncProgressSchema.parse(await readBody(event))
  const db = await getDatabase(event)
  const { userId } = event.context.session

  const progressItems = await syncProgress(db, userId, newProgressItems)

  return {
    progressItems
  }
})