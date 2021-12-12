import _ from 'lodash'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { IS_PRODUCTION } from './settings'
import { SprachyAPIValidationError } from './SprachyAPIClient'

export class HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  onRequest?: (req: Promise<any>) => void

  constructor(config: { baseURL?: string } = {}) {
    this.axios = axios.create({
      baseURL: config.baseURL || '/api',
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

  async request(config: AxiosRequestConfig): Promise<any> {
    const promise = this.axios.request(config).finally(() => {
      this.ongoingRequests = this.ongoingRequests.filter(r => r !== promise)
    })
    this.ongoingRequests.push(promise)
    if (this.onRequest)
      this.onRequest(promise)

    try {
      return await promise
    } catch (err: any) {
      if (err?.response?.data?.fieldErrors) {
        throw new SprachyAPIValidationError(err.response.data)
      } else {
        throw err
      }
    }
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

async function delay(amount: number) {
  return new Promise(resolve => {
    _.delay(resolve, amount)
  })
}