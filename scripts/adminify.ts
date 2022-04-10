import { db } from '../src/lib/server/db'

export async function adminify(email: string) {
  const user = await db.users.expectByEmail(email)
  if (user.isAdmin) {
    console.log(`${email} is already an admin`)
  } else {
    await db.users.update(user.id, { isAdmin: true })
    console.log(`${email} now has admin powers~`)
  }
}

adminify(process.argv[2])