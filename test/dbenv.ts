require('dotenv').config()

import { exec } from 'child-process-promise'  
const { parse } = require('pg-connection-string')
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// const SUPABASE_URL = 'https://emiwtmbwvmyoxyxxlwbv.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDQwNTM0NiwiZXhwIjoxOTQ1OTgxMzQ2fQ.F4oJH0B3Zugi7TZcq5solrKrNg_8lAp9ZHhsZ2jtFAg'


// Supabase URL: http://localhost:8000
// Supabase Key (anon, public): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoiYW5vbiJ9.36fUebxgx1mcBo4s19v0SzqmzunP--hm_hep0uLX0ew
// Supabase Key (service_role, private): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI
// Database URL: postgres://postgres:postgres@localhost:5432/postgres
// Email testing interface URL: http://localhost:9000

export type Client = { supabase: SupabaseClient }

let dbenvReady: { asService: Client, asUser: Client, asAdmin: Client } | null = null
export async function dbenv() {
  if (dbenvReady) return dbenvReady

  await setupTestDb()
  const asService = { supabase: createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_SECRET_KEY!) }
  const asUser = await getUserClient()
  const asAdmin = await getAdminClient()

  dbenvReady = { asService, asUser, asAdmin }
  return dbenvReady
}

/** Prepare a separate testing database to run tests on */
async function setupTestDb() {
  const testdb = process.env.TEST_DATABASE_URL
  if (!testdb) {
    throw new Error(`Can't run tests without defined TEST_DATABASE_URL`)
  }

  await exec(`psql ${testdb} -c "drop schema if exists public cascade;"`)
  await exec(`psql ${testdb} -c "create schema public;"`)

  // console.info("Installing supabase schema...")
  await exec(`psql ${testdb} -f sql/supabase.sql`)

  await exec(`DATABASE_URL=${testdb} npm run migrate up`)

  // console.info("Applying policies.sql...")
  await exec(`psql ${testdb} -f sql/policies.sql`)
}

async function getAdminClient() {
  const asAdmin = { supabase: createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!) }
  const { error, data } = await asAdmin.supabase.auth.signIn({ email: "adminuser@example.com", password: "adminuser-waffles" })
  if (error?.message === "Invalid login credentials") {
    const { error, data } = await asAdmin.supabase.auth.signUp({ email: "adminuser@example.com", password: "adminuser-waffles" })
    expect(error).toBe(null)
  }
  return asAdmin
}

async function getUserClient() {
  const asUser = { supabase: createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!) }
  const { error, data } = await asUser.supabase.auth.signIn({ email: "testuser@example.com", password: "testuser-waffles" })
  if (error?.message === "Invalid login credentials") {
    const { error, data } = await asUser.supabase.auth.signUp({ email: "testuser@example.com", password: "testuser-waffles" })
    expect(error).toBe(null)
  }
  return asUser
}