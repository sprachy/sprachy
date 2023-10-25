import { getDatabase, schema } from '~/db'
import { eq } from 'drizzle-orm'
import { time } from '~/lib/time'

export default defineEventHandler(async (event) => {
  const db = await getDatabase(event)

  await db.update(schema.progressItems).set({
    lastExperienceGainAt: Date.now() - time.days(100)
  })

  const progressItems = await db.select().from(schema.progressItems).where(
    eq(schema.progressItems.userId, event.context.session.userId)
  )

  return { progressItems }
})