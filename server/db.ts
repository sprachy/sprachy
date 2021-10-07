import faunadb, { Collection, Create, Expr, Get, Index, Login, Match, Ref, Update } from 'faunadb'
import type { Pattern, User } from '../common/api'
import _ from 'lodash'
import { FAUNA_ADMIN_KEY } from './secrets'


export type FaunaDocument<T> = {
  ref: { value: { id: string } }
  ts: number
  data: Omit<T, 'id' | 'ts'>
}

export namespace db {
  export async function querySingle<T>(expr: Expr) {
    return flattenFauna(
      await fauna.query(expr) as FaunaDocument<T>
    )
  }

  export async function query<T extends any[]>(expr: Expr) {
    const res = await fauna.query(expr) as { data: FaunaDocument<T[0]>[] }
    return res.data.map(flattenFauna)
  }

  
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

  export const fauna = new faunadb.Client({
    secret: FAUNA_ADMIN_KEY,
    fetch: typeof fetch === 'undefined' ? undefined : customFetch,
    domain: 'localhost',
    port: 8443,
    scheme: 'http'
  })

  export const fql = faunadb.query

  export namespace users {
    export async function get(userId: string): Promise<User> {
      return await db.querySingle<User>(
        Get(Ref(Collection("users"), userId))
      )
    }

    export async function getByEmail(email: string): Promise<User> {
      return await db.querySingle<User>(
          Get(Match(Index("users_by_email"), email))
      )
    }

    /**
     * Create a new user. Will fail if email is taken, due to faunadb unique constraint.
     */
    export async function create(data: Omit<User, 'id'> & { password: string }): Promise<User> {
      return await db.querySingle<User>(
        Create(
          Collection("users"),
          {
            credentials: {
              password: data.password
            },
            data: _.omit(data, 'password')
          }
        )
      )
    }

    export async function update(userId: string, changes: Partial<Omit<User, 'id'>>): Promise<User> {
      return await db.querySingle<User>(
        Update(
          Ref(Collection('users'), userId),
          {
            data: changes
          }
        )
      ) 
    }
  }
}