import type { ServerRequest } from "worktop/request"
import { Create, Collection, Get, Ref, Documents, Paginate, Delete, Var, Update, Map, Lambda } from 'faunadb'

import type { Pattern } from "../../common/api"
import { fauna, FaunaDocument, flattenFauna } from '../db'
import * as z from 'zod'


type AdminRequest = ServerRequest

export async function getPattern(req: AdminRequest) {
  const result = await fauna.query(
    Get(Ref(Collection("patterns"), req.params.id))
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
}

export async function listPatterns(req: AdminRequest) {
  const result = await fauna.query(
    Map(
      Paginate(Documents(Collection("patterns"))),
      Lambda("id", Get(Var("id")))
    )
  ) as { data: FaunaDocument<Pattern>[] }

  return result.data.map(flattenFauna)
}

const newPatternForm = z.object({
  title: z.string(),
  slug: z.string(),
  explanation: z.string()
})
export async function createPattern(req: AdminRequest) {
  const data = newPatternForm.parse(await req.body())

  const result = await fauna.query(
    Create(
      Collection('patterns'),
      {
        data: data
      }
    )
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
}

export async function updatePattern(req: AdminRequest) {
  const changes = newPatternForm.partial().parse(await req.body())

  const result = await fauna.query(
    Update(
      Ref(Collection('patterns'), req.params.id),
      {
        data: changes
      }
    )
  ) as FaunaDocument<Pattern>

  return flattenFauna(result)
}

export async function deletePattern(req: AdminRequest) {
  await fauna.query(
    Delete(
      Ref(Collection('patterns'), req.params.id)
    )
  )
}