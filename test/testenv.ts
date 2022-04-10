import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { SprachyAPIClient } from "../src/lib/client/SprachyAPIClient"
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from "./constants"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"
import type { HTTPProvider } from "../src/lib/client/HTTPProvider"
import type { ProgressSummary } from "$lib/api"

export class TestHTTPProvider implements HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  constructor() {
    this.axios = wrapper(
      axios.create({
        baseURL: "http://127.0.0.1:5998",
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

let _rando: { api: SprachyAPIClient } | null = null
export async function asRandoVisitor() {
  if (!_rando) {
    _rando = { api: new SprachyAPIClient(new TestHTTPProvider()) }
  }
  return _rando
}

let _user: { api: SprachyAPIClient, user: ProgressSummary['user'] } | null = null
export async function asExistingUser() {
  if (!_user) {
    const api = new SprachyAPIClient(new TestHTTPProvider())
    const { summary } = await api.login({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    })
    return { api, user: summary.user }
  }

  return _user
}