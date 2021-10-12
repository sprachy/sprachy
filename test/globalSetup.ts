require('dotenv').config()
import { TEST_DBNAME, TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD } from './constants'
import shell from 'shelljs'
import fs from 'fs'

/**
 * Jest runs all test files in parallel; this file is run before
 * any of them, so we want to set up the test database here.
 */
export default async function globalSetup() {
  shell.exec(`fauna delete-database ${TEST_DBNAME}`)
  shell.exec(`fauna create-database ${TEST_DBNAME}`)

  // Fauna cli is dumb and doesn't know how to like, split queries, so we do it with line breaks
  const fql = fs.readFileSync(`./schema.fql`, 'utf-8')
  const queries = fql.split("\n\n")
  for (const query of queries) {
    fs.writeFileSync(`/tmp/query.fql`, query)
    shell.exec(`fauna eval ${TEST_DBNAME} --file=/tmp/query.fql`)
  }

  const output = shell.exec(`fauna create-key ${TEST_DBNAME} admin`)
  const secret = output.match(/secret: (\S+)/)[1]
  // shell.exec(`sed -i '' -e 's/TEST_FAUNA_ADMIN_KEY=.*/TEST_FAUNA_ADMIN_KEY=${secret}/g' .env`)

  process.env.FAUNA_ADMIN_KEY = secret
  const { db } = require('../server/db')

  // Create test accounts
  await Promise.all([
    db.users.create({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
      isAdmin: false
    }),
    db.users.create({
      email: TEST_ADMIN_EMAIL,
      password: TEST_ADMIN_PASSWORD,
      isAdmin: true
    })
  ])
}