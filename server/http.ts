import _ from 'lodash'
// @ts-ignore
import { serialize } from 'object-to-formdata'

export class RequestError extends Error {
  constructor(message: string) {
    super(message)
  }
}

/**
 * HTTP libraries like axios don't work on Cloudflare Workers as
 * of writing, so we make our own little wrapper around the fetch API.
 */
namespace http {
  export interface HttpOptions {
    headers?: { [key: string]: string }
  }

  export async function request(url: RequestInfo, init: RequestInit): Promise<Response> {
    const response = await fetch(url, init)

    if (response.status < 200 || response.status >= 300) {
      console.error(response)
      throw new RequestError(`Received ${response.status} from ${init.method} request to ${url}`)
    }

    return response
  }

  export async function get(url: string, options: HttpOptions = {}) {
    return http.request(url, {
      method: 'GET',
      headers: options.headers || {}
    })
  }

  export async function del(url: string, options: HttpOptions = {}) {
    return http.request(url, {
      method: 'DELETE',
      headers: options.headers || {}
    })
  }

  export async function post(url: string, body: any, options: HttpOptions = {}) {
    return http.request(url, {
      body: serialize(body, {}, new URLSearchParams()),
      method: 'POST',
      headers: _.extend({
        'content-type': 'application/x-www-form-urlencoded',
      }, options.headers || {})
    })
  }

  export async function postJson(url: string, body: any, options: HttpOptions = {}) {
    return http.request(url, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: _.extend({
        'content-type': 'application/json;charset=UTF-8',
      }, options.headers || {})
    })
  }
}

export default http