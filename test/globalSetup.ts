import faunadb, { Delete, CreateDatabase, Database, Exists, If, Do, CreateKey } from 'faunadb'
import { SprachyAPIClient } from '../src/lib/client/SprachyAPIClient'
import { TestHTTPProvider } from './testenv'
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from './constants'
import shell from "shelljs"
import { ChildProcess } from 'child_process'
import * as schema from '../src/lib/server/schema'

let devServerProcess: ChildProcess

export async function setup() {
  const devFauna = new faunadb.Client({
    secret: process.env.FAUNA_ADMIN_KEY
  })

  // Delete any existing test child db and create a new one
  await devFauna.query(
    Do(
      If(
        Exists(Database('sprachy-vitest')),
        Delete(Database('sprachy-vitest')),
        null
      ),
      CreateDatabase({ name: 'sprachy-vitest' }),
    )
  )

  // Get a secret to use for FAUNA_ADMIN_KEY in testing
  const { secret } = await devFauna.query(
    CreateKey({ role: "admin", database: Database("sprachy-vitest") })
  ) as { secret: string }

  // Apply schema
  const testFauna = new faunadb.Client({
    secret: secret
  })

  await testFauna.query(schema.collections)
  await testFauna.query(schema.indexes)

  // Clean up any process left around from previous test
  shell.exec("pkill -9 -f 5998")

  devServerProcess = shell.exec(`FAUNA_ADMIN_KEY=${secret} npm run dev -- -p 5998`, { async: true })

  const devServerReady = new Promise<void>(resolve => {
    devServerProcess.stdout.on('data', (data: string) => {
      if (data.includes("local:")) {
        resolve()
      }
    })
  })

  await devServerReady

  // Sign up our test user
  const api = new SprachyAPIClient(new TestHTTPProvider())
  await api.signUp({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
    confirmPassword: TEST_USER_PASSWORD
  })
}

export async function teardown() {
  devServerProcess.kill(9)
}
