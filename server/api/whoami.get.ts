import { getDatabase, schema } from '~/db'
import { eq } from 'drizzle-orm'
import { omit } from 'lodash-es'

export default defineEventHandler(async (event) => {
  const db = await getDatabase(event)

  if (!event.context.session)
    return { status: 'guest' }

  const { userId } = event.context.session

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
    with: {
      progressItems: true
    }
  })

  if (!user)
    return { status: 'guest' }

  return {
    status: 'user',
    user: omit(user, ['hashedPassword', 'progressItems']),
    progressItems: user.progressItems
  }
})