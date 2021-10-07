#!./node_modules/.bin/ts-node -T

import dotenv from 'dotenv'
dotenv.config()
import sade from 'sade'
import { db } from './server/db'

async function adminify(email: string) {
  const user = await db.users.getByEmail(email)
  if (user.isAdmin) {
    console.log(`${email} is already an admin`)
  } else {
    await db.users.update(user.id, { isAdmin: true })
    console.log(`${email} now has admin powers~`)  
  }
}

process.on('unhandledRejection', (reason) => {
  console.error(reason)
  process.exit(-1)
})

sade('manage.ts')
  .command('adminify <email>')
    .describe('Make the user with the given email an admin')
    .action(adminify)
  .parse(process.argv)
