require('dotenv').config()

import { createClient, Session, User, SupabaseClient } from '@supabase/supabase-js'
import { UserAPI, AdminAPI } from '../src/api'

export type UserClient = { api: UserAPI, db: SupabaseClient, session: Session, user: User }
export type AdminClient = { adminApi: AdminAPI, api: UserAPI, db: SupabaseClient, session: Session, user: User }
export type ServiceClient = { db: SupabaseClient }

type TestEnvironment = { asService: ServiceClient, asUser: UserClient, asAdmin: AdminClient } 
let dbenvReady: TestEnvironment | null = null

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

  return { api, db, session: session!, user: session.user! }
}

async function getAdminClient(auth: { email: string, password: string }): Promise<AdminClient> {
  const asUser = await getUserClient(auth)
  return { adminApi: new AdminAPI(asUser.db), ...asUser }
}