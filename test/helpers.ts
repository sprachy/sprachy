import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'

// const SUPABASE_URL = 'https://emiwtmbwvmyoxyxxlwbv.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDQwNTM0NiwiZXhwIjoxOTQ1OTgxMzQ2fQ.F4oJH0B3Zugi7TZcq5solrKrNg_8lAp9ZHhsZ2jtFAg'


// Supabase URL: http://localhost:8000
// Supabase Key (anon, public): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoiYW5vbiJ9.36fUebxgx1mcBo4s19v0SzqmzunP--hm_hep0uLX0ew
// Supabase Key (service_role, private): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI
// Database URL: postgres://postgres:postgres@localhost:5432/postgres
// Email testing interface URL: http://localhost:9000

const SUPABASE_URL = "http://localhost:9001"
const SUPABASE_ANON_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoiYW5vbiJ9.36fUebxgx1mcBo4s19v0SzqmzunP--hm_hep0uLX0ew"
export type Client = { supabase: SupabaseClient }

const prisma = new PrismaClient()

async function getAdminClient() {
  const asAdmin = { supabase: createClient(SUPABASE_URL, SUPABASE_ANON_KEY) }
  const { error, data } = await asAdmin.supabase.auth.signIn({ email: "adminuser@example.com", password: "adminuser-waffles" })
  if (error?.message === "Invalid login credentials") {
    const { error, data } = await asAdmin.supabase.auth.signUp({ email: "adminuser@example.com", password: "adminuser-waffles" })
    expect(error).toBe(null)
  }
  return asAdmin
}

let dbenvCache: { asUser: Client, asAdmin: Client, prisma: PrismaClient } | null = null
export async function dbenv() {
  if (dbenvCache) return dbenvCache

  const asUser = { supabase: createClient(SUPABASE_URL, SUPABASE_ANON_KEY) }
  const { error, data } = await asUser.supabase.auth.signIn({ email: "testuser@example.com", password: "testuser-waffles" })
  if (error?.message === "Invalid login credentials") {
    const { error, data } = await asUser.supabase.auth.signUp({ email: "testuser@example.com", password: "testuser-waffles" })
    expect(error).toBe(null)
  }

  const asAdmin = await getAdminClient()

  dbenvCache = { asUser, asAdmin, prisma }
  return dbenvCache
}
