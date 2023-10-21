
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from 'better-sqlite3'

const connectionString = process.env.DEV_DATABASE_URL
const sqlite = new Database(connectionString!)
const db = drizzle(sqlite)

migrate(db, { migrationsFolder: "drizzle" })