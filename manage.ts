#!./node_modules/.bin/ts-node -T

import dotenv from 'dotenv'
dotenv.config()
import sade from 'sade'
import { runShell } from './commands/shell'
import { adminify } from './commands/adminify'
import { resetdb } from './commands/resetdb'

process.on('unhandledRejection', (reason) => {
  console.error(reason)
  process.exit(-1)
})

sade('manage.ts')
  .command('shell')
    .describe('Open a node REPL in the app context')
    .action(runShell)
  .command('resetdb')
    .describe('Recreate the database')
    .action(resetdb)
  .command('adminify <email>')
    .describe('Make the user with the given email an admin')
    .action(adminify)
  .parse(process.argv)
