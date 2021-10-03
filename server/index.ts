import { Router, listen } from 'worktop'
import faunadb from 'faunadb'
import { TypedRouter } from './TypedRouter'
import type { APISchema, Pattern } from '../common/api'

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

declare const FAUNA_SECRET: string

const router = new TypedRouter<APISchema>()

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
  fetch: customFetch
})

const { Create, Collection, Match, Index, Get, Ref, Documents, Paginate, Sum, Delete, Add, Select, Let, Var, Update, Map, Lambda } = faunadb.query


function flattenFauna<T>(d: FaunaDocument<T>): T {
  return {
    id: d.ref.value.id,
    ts: d.ts,
    ...d.data
  } as any
}
``


type FaunaDocument<T> = {
  ref: { value: { id: string } }
  ts: number
  data: Omit<T, 'id'|'ts'>
}

// } catch (error) {
//   const faunaError = getFaunaError(error)
//   res.send(faunaError.status, faunaError)
// }



router.add('GET', '/patterns/:id', async (req, res) => {
  const result = await faunaClient.query(
    Get(Ref(Collection("patterns"), req.params.id))
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
})

router.add('GET', '/patterns', async (req, res) => {
  const result = await faunaClient.query(
    Map(
      Paginate(Documents(Collection("patterns"))),
      Lambda("id", Get(Var("id")))
    )
  ) as { data: FaunaDocument<Pattern>[] }

  return result.data.map(flattenFauna)
})

router.add('POST', '/patterns', async (req, res) => {
  const data = await req.body()

  const result = await faunaClient.query(
    Create(
      Collection('patterns'),
      {
        data: data
      }
    )
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
})

router.add('PATCH', '/patterns/:id', async (req, res) => {
  const changes = await req.body()

  const result = await faunaClient.query(
    Update(
      Ref(Collection('patterns'), req.params.id),
      {
        data: changes
      }
    )
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
})

router.add('DELETE', '/patterns/:id', async (req, res) => {
  await faunaClient.query(
    Delete(
      Ref(Collection('patterns'), req.params.id)
    )
  )
})

listen(router.worktopRouter.run)