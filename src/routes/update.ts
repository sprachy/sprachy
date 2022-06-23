import { db } from "$lib/server/db"
import faunadb from "faunadb"
const q = faunadb.query

export async function get() {
  const users = await db.users.listAll()

  for (const user of users) {
    const progressItems = await db.progress.listAllFor(user.id)
    for (const progress of progressItems) {
      await db.progress.update(progress.id, {
        experience: (progress as any).srsLevel * 1000
      })
    }
  }
  return {
    body: {
      updatedUsers: users.length
    }
  }
}
