import faunadb, { Collection, Get, Login, Ref } from 'faunadb'
import { string } from 'zod'
import type { Pattern, User } from '../common/api'

declare const FAUNA_ADMIN_KEY: string

function customFetch(url: RequestInfo, params: RequestInit | undefined) {
  const signal = params?.signal
  delete params?.signal

  const abortPromise: Promise<Response> = new Promise((resolve) => {
    if (signal) {
      signal.onabort = resolve as any
    }
  })

  return Promise.race([abortPromise, fetch(url, params)])
}

export function getFaunaError(error: any) {
  const { code, description } = error.requestResult.responseContent.errors[0]
  let status

  switch (code) {
    case 'instance not found':
      status = 404
      break
    case 'instance not unique':
      status = 409
      break
    case 'permission denied':
      status = 403
      break
    case 'unauthorized':
    case 'authentication failed':
      status = 401
      break
    default:
      status = 500
  }

  return { code, description, status }
}

export function flattenFauna<T>(d: FaunaDocument<T>): T {
  return {
    id: d.ref.value.id,
    ts: d.ts,
    ...d.data
  } as any
}
``

export type FaunaDocument<T> = {
  ref: { value: { id: string } }
  ts: number
  data: Omit<T, 'id' | 'ts'>
}

export const fauna = new faunadb.Client({
  secret: FAUNA_ADMIN_KEY,
  fetch: customFetch,
  domain: 'localhost',
  port: 8443,
  scheme: 'http'
})

export const fql = faunadb.query

export namespace users {
  export async function get(userId: string): Promise<User> {
    const result = await fauna.query(
      Get(Ref(Collection("users"), userId))
    ) as FaunaDocument<User>
  
    return flattenFauna(result)  
  }
}