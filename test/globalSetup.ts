require('dotenv').config()
import { exec } from 'child-process-promise'  
import { createClient } from '@supabase/supabase-js'
import { TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD } from './constants'

async function makeAccount(email: string, password: string) {
  const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!)
  const { user, error } = await db.auth.signUp({ email, password })
  if (error) {
    throw error
  }
  return user!
}

/**
 * Jest runs all test files in parallel; this file is run before
 * any of them, so we want to set up the test database here.
 */
export default async function globalSetup() {
  const testdb = process.env.TEST_DATABASE_URL
  if (!testdb) {
    throw new Error(`Can't run tests without defined TEST_DATABASE_URL`)
  }

  // Drop and recreate public schema
  // This leaves the supabase "auth" schema unchanged between tests
  await exec(`echo "drop schema if exists public cascade; create schema public;" | psql ${testdb}`)

  // Add base supabase schema
  await exec(`psql ${testdb} -f sql/supabase.sql`)

  // Run migrations
  await exec(`DATABASE_URL=${testdb} npm run migrate up`)

  // It's mean to be idempotent, so run policies.sql twice to test that
  await exec(`psql ${testdb} -f sql/policies.sql && psql ${testdb} -f sql/policies.sql`)

  // Create test accounts
  const [user, adminUser] = await Promise.all([
    makeAccount(TEST_USER_EMAIL, TEST_USER_PASSWORD),
    makeAccount(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD)
  ])

  // Make admin user an admin
  const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_SECRET_KEY!)
  await db.from("accounts").update({ is_admin: true }).match({ id: adminUser.id })
}