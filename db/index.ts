import * as schema from './schema'
import Database from 'better-sqlite3'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleD1, type DrizzleD1Database } from 'drizzle-orm/d1'


export { schema }

export type DrizzleSqliteDB = DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>

let db: DrizzleSqliteDB

export async function getDatabase(event: Parameters<Parameters<typeof defineEventHandler>[0]>[0]) {
  if (!db) {
    if (process.dev) {
      const sqlite = new Database(process.env.DEV_DATABASE_URL!)
      db = drizzle(sqlite, { schema })
    } else {
      const { cloudflare } = event.context
      db = drizzleD1(cloudflare.env.D1, { schema })
    }
  }
  return db
}

