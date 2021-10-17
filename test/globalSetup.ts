require('dotenv').config()
import { TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD } from './constants'
import faunadb, { CreateDatabase, CreateKey, Database, Delete, Do, Exists, If } from 'faunadb'
import * as schema from '../server/schema'
import { db } from '../server/db'
import { Miniflare } from 'miniflare'
import { Server } from 'http'

declare const global: { miniflareServer: Server }

/**
 * Jest runs all test files in parallel; this file is run before
 * any of them, so we want to set up the test database here and
 * open the miniflare server.
 */
export default async function globalSetup() {
  const devFauna = new faunadb.Client({
    secret: process.env.FAUNA_ADMIN_KEY,
    domain: 'localhost',
    port: 8443,
    scheme: 'http'
  })

  // Create test db as a child database of the development db
  const { secret } = await devFauna.query(
    Do(
      If(
        Exists(Database("test")),
        Delete(Database("test")),
        null
      ),
      CreateDatabase({
        name: "test"
      }),
      CreateKey({
        database: Database("test"),
        role: "admin"
      })
    )
  ) as { secret: string }

  // Apply the schema
  const fauna = new faunadb.Client({
    secret: secret,
    domain: 'localhost',
    port: 8443,
    scheme: 'http'
  })

  await fauna.query(schema.collections)
  await fauna.query(schema.indexes)

  // Set admin key for tests and create some test data
  process.env.FAUNA_ADMIN_KEY = secret
  db.fauna.client = fauna

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
    }),
    db.patterns.create({
      slug: "die-der-das",
      title: "Die, der, das",
      explanation: "stuff!",
      exercises: [{
        content: "[die] Katze",
        translation: "[the] cat"
      }]
    }),
    db.patterns.create({
      slug: "der-norden",
      title: "Der Norden",
      explanation: "stuff!",
      exercises: [{
        content: "[die] Katze",
        translation: "[the] cat"
      }]
    }),
  ])

  // Start test server
  const mf = new Miniflare({
    scriptPath: "./server/devdist/worker.js",
    buildCommand: "",
    kvNamespaces: ["STORE"],
    bindings: {
      FAUNA_ADMIN_KEY: secret
    }
  })

  global.miniflareServer = mf.createServer()
  global.miniflareServer.listen(5998)
}