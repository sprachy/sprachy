import faunadb from 'faunadb'
import { env } from './env'
const { Expr } = faunadb

export class FaunaError extends Error {
  /** HTTP status code */
  status: number
  /** The faunadb error code */
  code: string

  constructor(err: any) {
    let code: string = 'unknown error'
    let message: string = err.message

    const errors = err.requestResult?.responseContent?.errors
    if (errors && errors.length) {
      code = errors[0].code
      message = errors[0].description
    }

    super(message)

    switch (code) {
      case 'instance not found':
        this.status = 404
        break
      case 'instance not unique':
        this.status = 409
        break
      case 'permission denied':
        this.status = 403
        break
      case 'unauthorized':
      case 'authentication failed':
        this.status = 401
        break
      default:
        this.status = 500
    }
    this.code = code
  }
}


function deserializeFauna(prop: any): any {
  if (prop instanceof Expr && 'date' in prop) {
    // Convert fauna datetimes to integer timestamps
    return (prop as any).date.getTime()
  } else if (prop instanceof Expr && 'id' in prop) {
    // Refs to string ids
    return (prop as any).id
  } else if (Array.isArray(prop)) {
    return prop.map(deserializeFauna)
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

export function makeFaunaClient(options: Partial<faunadb.ClientConfig> = {}): faunadb.Client {
  const secret = options.secret || env.FAUNA_ADMIN_KEY
  if (!secret) {
    throw new Error(`No FAUNA_ADMIN_KEY set; Sprachy can't connect to database`)
  }

  const config: faunadb.ClientConfig = {
    secret: secret
  }

  if (env.FAUNA_DOMAIN)
    config.domain = env.FAUNA_DOMAIN
  if (env.FAUNA_PORT)
    config.port = parseInt(env.FAUNA_PORT)
  if (env.FAUNA_SCHEME === 'http')
    config.scheme = env.FAUNA_SCHEME

  Object.assign(config, options)
  return new faunadb.Client(config)
}