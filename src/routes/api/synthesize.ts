import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'
import http from '$lib/server/http'
import { env } from "$lib/server/env"
// @ts-ignore
import { getGoogleAuthToken } from "$lib/getGoogleAuthToken"

const synthesizeSchema = z.object({
  text: z.string()
})
export const post: RequestHandler = async ({ request, locals }) => {
  const { text } = synthesizeSchema.parse(await request.json())

  const credentials = JSON.parse(atob(env.GOOGLE_CLOUD_CREDENTIALS))
  const accessToken = await getGoogleAuthToken(credentials.client_email, credentials.private_key, "https://www.googleapis.com/auth/cloud-platform")

  const res = await http.postJson(`https://texttospeech.googleapis.com/v1/text:synthesize`, {
    input: {
      text: text
    },
    voice: {
      languageCode: 'de-DE',
      name: 'de-DE-Wavenet-A',
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return {
    status: 200,
    body: await res.json()
  }
}