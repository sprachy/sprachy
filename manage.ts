#!./node_modules/.bin/ts-node -T

import dotenv from 'dotenv'
dotenv.config()
import sade from 'sade'
import { db } from './server/db'
import repl from 'repl'
const vm = require("vm");
const { processTopLevelAwait } = require("node-repl-await");

function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}

async function myEval(code, context, filename, callback) {
    code = processTopLevelAwait(code) || code;

    try {
        let result = await vm.runInNewContext(code, context);
        callback(null, result);
    } catch (e) {
        if (isRecoverableError(e)) {
            callback(new repl.Recoverable(e));
        } else {
            console.log(e);
        }
    }
}

let shelling: boolean = false
async function shell() {
  shelling = true
  const r = repl.start({ prompt: "> ", eval: myEval })
  r.context.db = db
}

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
  if (shelling) return
  console.error(reason)
  process.exit(-1)
})

sade('manage.ts')
  .command('shell')
    .describe('Open a node REPL in the app context')
    .action(shell)
  .command('adminify <email>')
    .describe('Make the user with the given email an admin')
    .action(adminify)
  .parse(process.argv)
