import { db } from '../server/db'

export async function adminify(email: string) {
  const user = await db.users.getByEmail(email)
  if (user.isAdmin) {
    console.log(`${email} is already an admin`)
  } else {
    await db.users.update(user.id, { isAdmin: true })
    console.log(`${email} now has admin powers~`)  
  }
}