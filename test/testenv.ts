// async function getUserClient({ email, password }: { email: string, password: string }): Promise<UserClient> {
//   const db = createClient(process.env.TEST_SUPABASE_URL!, process.env.TEST_SUPABASE_ANON_KEY!)
//   const api = new UserAPI(db)
//   const session = await api.signIn({ email, password })

import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { HTTPProvider, UserAPI } from "../client/ClientAPI"
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from "./constants"
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'

//   return { api, db, session: session!, user: session.user! }
// }

// async function getAdminClient(auth: { email: string, password: string }): Promise<AdminClient> {
//   const asUser = await getUserClient(auth)
//   return { adminApi: new AdminAPI(asUser.db), ...asUser }
// }

export class TestHTTPProvider implements HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  constructor() {
    this.axios = wrapper(axios.create({
      baseURL: "http://localhost:5998/api",
      timeout: 10000,
      jar: new CookieJar()
    }))
  }

  async request(config: AxiosRequestConfig): Promise<any> {
    return this.axios.request(config)
  }

  async get(path: string): Promise<any> {
    return this.request({ method: 'GET', url: path })
  }

  async post(path: string, data?: any, opts: AxiosRequestConfig = {}): Promise<any> {
    return this.request(Object.assign({ method: 'POST', url: path, data: data }, opts))
  }

  async put(path: string, data?: any): Promise<any> {
    return this.request({ method: 'PUT', url: path, data: data })
  }

  async patch(path: string, data: any): Promise<any> {
    return this.request({ method: 'PATCH', url: path, data: data })
  }

  async delete(path: string): Promise<any> {
    return this.request({ method: 'DELETE', url: path })
  }
}


type TestEnv = {
  asUser: { api: UserAPI }
  // asAdmin: UserAPI
}

let testenvReady: TestEnv|null = null

async function setupTestEnv(): Promise<TestEnv> {
  const asUser = { api: new UserAPI(new TestHTTPProvider()) }
  await asUser.api.signIn({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD
  })
  
  return { asUser }
}

export async function testenv() {
  if (!testenvReady) {
    testenvReady = await setupTestEnv()
  }
  return testenvReady
}