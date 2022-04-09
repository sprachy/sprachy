import { Miniflare } from 'miniflare'

export async function setup() {
  // Start test server
  const mf = new Miniflare({
    scriptPath: "./workers-site/index.js",
    buildCommand: "",
    kvNamespaces: ["STORE"],
    bindings: {
      // FAUNA_ADMIN_KEY: secret,
      IS_TESTING: true
    }
  })

  global.miniflareServer = await mf.createServer()
  global.miniflareServer.listen(5998)
}

export async function teardown() {

}