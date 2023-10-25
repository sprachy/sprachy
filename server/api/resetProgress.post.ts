import { getDatabase, schema } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = await getDatabase(event)

  await db.delete(schema.progressItems).where(
    eq(schema.progressItems.userId, event.context.session.userId)
  )

  return { success: true }
})