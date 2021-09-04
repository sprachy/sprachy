require('dotenv').config()

import { exec } from 'child-process-promise'  
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { UserAPI } from '../src/UserAPI'
import { AdminAPI } from '../src/AdminAPI'
// const SUPABASE_URL = 'https://emiwtmbwvmyoxyxxlwbv.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDQwNTM0NiwiZXhwIjoxOTQ1OTgxMzQ2fQ.F4oJH0B3Zugi7TZcq5solrKrNg_8lAp9ZHhsZ2jtFAg'


// Supabase URL: http://localhost:8000
// Supabase Key (anon, public): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoiYW5vbiJ9.36fUebxgx1mcBo4s19v0SzqmzunP--hm_hep0uLX0ew
// Supabase Key (service_role, private): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI
// Database URL: postgres://postgres:postgres@localhost:5432/postgres
// Email testing interface URL: http://localhost:9000

export type UserClient = { api: UserAPI, db: SupabaseClient, session: Session }
export type AdminClient = { adminApi: AdminAPI, api: UserAPI, db: SupabaseClient, session: Session }
export type ServiceClient = { db: SupabaseClient }

let dbenvReady: { asService: ServiceClient, asUser: UserClient, asAdmin: UserClient } | null = null
export async function dbenv() {
  if (dbenvReady) return dbenvReady

  await setupTestDb()
  const asService = { db: createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_SECRET_KEY!) }
  const asUser = await getUserClient({ email: "testuser@example.com", password: "testuser-waffles" })
  const asAdmin = await getAdminClient(asService, { email: "adminuser@example.com", password: "adminuser-waffles" })

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

async function getUserClient({ email, password }: { email: string, password: string }): Promise<UserClient> {
  const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!)
  const api = new UserAPI(db)

  const user = await api.signUp({ email, password })
  const session = await api.signIn({ email, password })

  return { api, db, session: session! }
}

async function getAdminClient(asService: ServiceClient, auth: { email: string, password: string }): Promise<AdminClient> {
  const asUser = await getUserClient(auth)
  console.log(asUser.session)

  // Make the new user an admin
  const { error, data } = await asService.db.from("accounts").update({ is_admin: true }).match({ id: asUser.session.user!.id })
  if (error) {
    throw new Error(error.message)
  }
  console.log(data)

  return { adminApi: new AdminAPI(asUser.db), ...asUser }
}