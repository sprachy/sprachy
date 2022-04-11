import { Delete, CreateDatabase, Database, Exists, If, Do, CreateKey } from 'faunadb'
import shell from "shelljs"
import type { ChildProcess } from 'child_process'
import * as schema from '$lib/server/schema'
import { makeFaunaClient } from '$lib/server/faunaUtil'

let devServerProcess: ChildProcess

export async function setup() {
  const devFauna = makeFaunaClient()

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

  // Put it in env for the tests to retrieve
  process.env['FAUNA_ADMIN_KEY'] = secret

  // Apply schema
  const testFauna = makeFaunaClient({ secret })
  await testFauna.query(schema.collections)
  await testFauna.query(schema.indexes)

  // Clean up any process left around from previous test
  shell.exec("kill $(lsof -t -i:5998)", { silent: true })

  devServerProcess = shell.exec(`FAUNA_ADMIN_KEY=${secret} npm run dev -- -p 5998`, { async: true })

  const devServerReady = new Promise<void>(resolve => {
    devServerProcess.stdout!.on('data', (data: string) => {
      if (data.includes("local:")) {
        resolve()
      }
    })
  })

  await devServerReady
}

export async function teardown() {
  devServerProcess.kill()
}
