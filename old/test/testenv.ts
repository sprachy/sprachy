import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { SprachyAPIClient } from "../client/SprachyAPIClient"
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from "./constants"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"
import { HTTPProvider } from "../client/HTTPProvider"

export class TestHTTPProvider implements HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  constructor() {
    this.axios = wrapper(
      axios.create({
        baseURL: "http://localhost:5998",
        timeout: 10000,
        jar: new CookieJar(),
      })
    )
  }

  async request(config: AxiosRequestConfig): Promise<any> {
    return this.axios.request(config)
  }

  async get(path: string): Promise<any> {
    const { data } = await this.request({ method: "GET", url: path })
    return data
  }

  async post(
    path: string,
    body?: any,
    opts: AxiosRequestConfig = {}
  ): Promise<any> {
    const { data } = await this.request(
      Object.assign({ method: "POST", url: path, data: body }, opts)
    )
    return data
  }

  async put(path: string, body?: any): Promise<any> {
    const { data } = await this.request({ method: "PUT", url: path, data: body })
    return data
  }

  async patch(path: string, body: any): Promise<any> {
    const { data } = await this.request({ method: "PATCH", url: path, data: body })
    return data
  }

  async delete(path: string): Promise<any> {
    const { data } = await this.request({ method: "DELETE", url: path })
    return data
  }
}

type TestEnv = {
  asUser: { api: SprachyAPIClient }
  asRando: { api: SprachyAPIClient }
  // asAdmin: SprachyAPIClient
}

let testenvReady: TestEnv | null = null

async function setupTestEnv(): Promise<TestEnv> {
  const asRando = { api: new SprachyAPIClient(new TestHTTPProvider()) }
  const asUser = { api: new SprachyAPIClient(new TestHTTPProvider()) }
  await asUser.api.login({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
  })

  return { asUser, asRando }
}

export async function testenv() {
  if (!testenvReady) {
    testenvReady = await setupTestEnv()
  }
  return testenvReady
}
