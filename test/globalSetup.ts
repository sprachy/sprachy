import shell from "shelljs"
import type { ChildProcess } from 'child_process'
import waitOn from 'wait-on'

let devServerProcess: ChildProcess

export async function setup() {
  // Clean up any process left around from previous test
  shell.exec("kill $(lsof -t -i:5998)", { silent: true })

  // Clear the test KV store
  shell.exec("rm -rf .mf/kv/TESTSTORE", { silent: true })

  devServerProcess = shell.exec(`TESTING=1 ./node_modules/.bin/nuxt dev --port=5998 --no-clear --no-fork`, { async: true })

  console.log("Waiting for test server to start")

  await waitOn({
    resources: [
      'http://localhost:5998'
    ]
  })
}

export async function teardown() {
  devServerProcess.kill()
}