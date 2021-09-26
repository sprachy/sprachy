require('dotenv').config()
import { exec } from 'child-process-promise'  
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js'
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
  await exec(`psql ${testdb} -c "drop schema if exists public cascade;"`)
  await exec(`psql ${testdb} -c "create schema public;"`)

  // Add base supabase schema
  await exec(`psql ${testdb} -f sql/supabase.sql`)

  await exec(`DATABASE_URL=${testdb} npm run migrate up`)

  await exec(`psql ${testdb} -f sql/policies.sql`)
  // It's mean to be idempotent, run it twice to test that
  await exec(`psql ${testdb} -f sql/policies.sql`)

  // Create test user account
  await makeAccount(TEST_USER_EMAIL, TEST_USER_PASSWORD)

  // Create test admin account
  const adminUser = await makeAccount(TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD)
  const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_SECRET_KEY!)
  await db.from("accounts").update({ is_admin: true }).match({ id: adminUser.id })
}