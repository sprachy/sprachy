import { }

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