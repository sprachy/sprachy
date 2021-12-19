import _ from 'lodash'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IS_PRODUCTION } from './settings'
import { otherResponse } from './utils'

export type RequestOpts = AxiosRequestConfig & { safe?: boolean }

export class HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  onRequest?: (req: Promise<any>) => void

  constructor(config: { baseURL?: string } = {}) {
    this.axios = axios.create({
      baseURL: config.baseURL || '',
      timeout: 10000
    })

    if (!IS_PRODUCTION) {
      // In development, delay all requests by a small random amount to simulate live user experience.
      // This helps with dev-prod parity so that we remember to do good loading behavior.
      this.axios.interceptors.response.use(async response => {
        // Numbers are based on how long API requests take for me on GitHub, which uses
        // a similar kind of loading indicator to us
        await delay(_.random(200, 700))
        return response
      })
    }
  }

  async request(opts: RequestOpts): Promise<AxiosResponse<any>> {
    const promise = this.axios.request(opts).finally(() => {
      this.ongoingRequests = this.ongoingRequests.filter(r => r !== promise)
    })
    this.ongoingRequests.push(promise)
    if (this.onRequest)
      this.onRequest(promise)

    return promise
  }

  async get(path: string) {
    const { data } = await this.request({ method: 'GET', url: path })
    return data
  }

  async post(path: string, body?: any, opts: RequestOpts = {}) {
    const { data } = await this.request(Object.assign({ method: 'POST', url: path, data: body }, opts))
    return data
  }

  async put(path: string, body?: any) {
    const { data } = await this.request({ method: 'PUT', url: path, data: body })
    return data
  }

  async patch(path: string, body: any) {
    const { data } = await this.request({ method: 'PATCH', url: path, data: body })
    return data
  }

  async delete(path: string) {
    const { data } = await this.request({ method: 'DELETE', url: path })
    return data
  }
}

async function delay(amount: number) {
  return new Promise(resolve => {
    _.delay(resolve, amount)
  })
}

/**
 * Catch any errors and return the status code
 */
export async function safeRequest(promise: Promise<any>) {
  try {
    const data = await promise
    return { status: 200, ...data }
  } catch (err: any) {
    if (err?.response?.data) {
      return { status: err.response.status, ...err.response.data }
    } else {
      throw err
    }
  }
}