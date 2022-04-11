import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { SprachyAPIClient } from "../src/lib/client/SprachyAPIClient"
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from "./constants"
import { wrapper } from "axios-cookiejar-support"
import { CookieJar } from "tough-cookie"
import type { HTTPProvider } from "../src/lib/client/HTTPProvider"
import type { ProgressSummary } from "$lib/api"
import { v4 as uuid } from 'uuid'

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

export class TestEnvironment {
  private randoClient?: { api: SprachyAPIClient }
  private userClient?: { api: SprachyAPIClient, user: ProgressSummary['user'] }

  async asRando() {
    if (!this.randoClient) {
      this.randoClient = { api: new SprachyAPIClient(new TestHTTPProvider()) }
    }
    return this.randoClient
  }

  async asUser() {
    if (!this.userClient) {
      const api = new SprachyAPIClient(new TestHTTPProvider())

      const email = `testdork+${uuid()}@yuh.com`
      const password = uuid()

      const { summary } = await api.signUp({
        email: email,
        password: password,
        confirmPassword: password
      })
      return { api, user: summary.user, password: password }
    }

    return this.userClient
  }
}

export const testenv = new TestEnvironment()