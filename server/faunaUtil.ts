import faunadb, { Expr } from 'faunadb'
import type { ClientConfig } from 'faunadb'

export function customFetch(url: RequestInfo, params: RequestInit | undefined) {
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


function deserializeFauna(prop: any): any {
  if (prop instanceof Expr && 'date' in prop) {
    // Convert fauna datetimes to integer timestamps
    return (prop as any).date.getTime()
  } else if (prop instanceof Expr && 'id' in prop) {
    // Refs to string ids
    return (prop as any).id
  } else if (typeof prop === 'object') {
    const newObj: any = {}

    for (const key in prop) {
      const m = key.match(/^(.+)Ref$/)
      if (m) {
        newObj[m[1] + 'Id'] = deserializeFauna(prop[key])
      } else if (key === 'ref') {
        newObj.id = deserializeFauna(prop[key])
      } else if (key === 'data') {
        Object.assign(newObj, deserializeFauna(prop.data))
      } else {
        newObj[key] = deserializeFauna(prop[key])
      }
    }

    return newObj
  } else {
    return prop
  }
}

export function flattenFauna<T>(d: FaunaDocument<T>): T {
  return deserializeFauna(d)
}

export type FaunaDocument<T> = {
  ref: { value: { id: string } }
  ts: number
  data: Omit<T, 'id' | 'ts'>
}

export function makeFaunaClient(config: Omit<ClientConfig, 'fetch'>) {
  return new faunadb.Client({
    fetch: typeof fetch === 'undefined' ? undefined : customFetch,
    ...config
  })
}