import type { Pattern } from "../../common/api"
import { db } from '../db'
import * as z from 'zod'
import type { AdminRequest } from "../routers"

export async function getPattern(req: AdminRequest) {
  return await db.patterns.get(req.params.id as string)
}

export async function listPatterns(req: AdminRequest): Promise<Pattern[]> {
  return await db.patterns.listAll()
}

const newPatternForm = z.object({
  title: z.string(),
  slug: z.string(),
  explanation: z.string(),
  exercises: z.array(z.object({
    content: z.string(),
    translation: z.string()
  }))
})
export async function createPattern(req: AdminRequest) {
  const data = newPatternForm.parse(await req.body())
  return await db.patterns.create(data)
}

export async function updatePattern(req: AdminRequest) {
  const changes = newPatternForm.partial().parse(await req.body())
  return await db.patterns.update(req.params.id as string, changes)
}

export async function deletePattern(req: AdminRequest) {
  await db.patterns.destroy(req.params.id as string)
}