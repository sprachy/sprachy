import type { RequestHandler } from '@sveltejs/kit'
import * as z from 'zod'
import { db } from '$lib/server/db'
import { kvs } from '$lib/server/kvs'

const confirmEmailChangeForm = z.object({
  token: z.string()
})
export const POST: RequestHandler = async ({ request, locals }) => {
  const { token } = confirmEmailChangeForm.parse(await request.json())

  const json = await kvs.getJson<{ userId: string, email: string }>(`email_confirm_tokens:${token}`)
  if (json && json.userId === locals.session?.userId) {
    await db.users.update(locals.session.userId, { email: json.email })
    return { newEmail: json.email }
  } else {
    return { status: 400, error: "Invalid or expired token" }
  }
}