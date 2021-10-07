import type { ServerRequest } from "worktop/request"
import { Create, Collection, Get, Ref, Documents, Paginate, Delete, Var, Update, Map, Lambda } from 'faunadb'

import type { Pattern } from "../../common/api"
import { db } from '../db'
import * as z from 'zod'


type AdminRequest = ServerRequest

export async function getPattern(req: AdminRequest) {
  return await db.querySingle<Pattern>(
    Get(Ref(Collection("patterns"), req.params.id))
  )
}

export async function listPatterns(req: AdminRequest): Promise<Pattern[]> {
  return await db.query<Pattern[]>(
    Map(
      Paginate(Documents(Collection("patterns"))),
      Lambda("id", Get(Var("id")))
    )
  )
}

const newPatternForm = z.object({
  title: z.string(),
  slug: z.string(),
  explanation: z.string(),
  exercises: z.array(z.object({
    content: z.string()
  }))
})
export async function createPattern(req: AdminRequest) {
  const data = newPatternForm.parse(await req.body())

  return await db.querySingle<Pattern>(
    Create(
      Collection('patterns'),
      {
        data: data
      }
    )
  )
}

export async function updatePattern(req: AdminRequest) {
  const changes = newPatternForm.partial().parse(await req.body())

  return await db.querySingle<Pattern>(
    Update(
      Ref(Collection('patterns'), req.params.id),
      {
        data: changes
      }
    )
  )
}

export async function deletePattern(req: AdminRequest) {
  await db.fauna.query(
    Delete(
      Ref(Collection('patterns'), req.params.id)
    )
  )
}