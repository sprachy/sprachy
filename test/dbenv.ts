require('dotenv').config()

import { exec } from 'child-process-promise'  
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { UserAPI, AdminAPI } from '../src/api'
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

type TestEnvironment = { asService: ServiceClient, asUser: UserClient, asAdmin: UserClient } 
let dbenvReady: TestEnvironment | null = null
let testenvPromise: Promise<TestEnvironment> | null = null

export async function dbenv() {
  if (dbenvReady) return dbenvReady

  // Service client representing backend db connection
  const asService = { db: createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_SECRET_KEY!) }

  // User client representing 
  const asUser = await getUserClient({ email: "testuser@example.com", password: "testuser-waffles" })
  const asAdmin = await getAdminClient({ email: "adminuser@example.com", password: "adminuser-waffles" })

  dbenvReady = { asService, asUser, asAdmin }
  return dbenvReady
}


async function getUserClient({ email, password }: { email: string, password: string }): Promise<UserClient> {
  const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!)
  const api = new UserAPI(db)
  const session = await api.signIn({ email, password })

  return { api, db, session: session! }
}

async function getAdminClient(auth: { email: string, password: string }): Promise<AdminClient> {
  const asUser = await getUserClient(auth)
  return { adminApi: new AdminAPI(asUser.db), ...asUser }
}