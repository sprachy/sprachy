import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'
import http from '$lib/server/http'
import { env } from "$lib/server/env"
import { kvs } from "$lib/server/kvs"
import SparkMD5 from "spark-md5"
import { jsonResponse } from "$lib/server/util"

// @ts-ignore
import { getGoogleAuthToken } from "$lib/getGoogleAuthToken"

const translateSchema = z.object({
  from: z.string(),
  to: z.string(),
  texts: z.array(z.string())
})

export type VoiceSynthesisRequestSchema = z.infer<typeof translateSchema>

export const POST: RequestHandler = async ({ request }) => {
  const options = translateSchema.parse(await request.json())

  const googleOptions = {
    contents: options.texts,
    sourceLanguageCode: options.from,
    targetLanguageCode: options.to
  }

  const credentials = JSON.parse(atob(env.GOOGLE_CLOUD_CREDENTIALS!))
  const accessToken = await getGoogleAuthToken(credentials.client_email, credentials.private_key, "https://www.googleapis.com/auth/cloud-platform")

  const hashkey = SparkMD5.hash(JSON.stringify(options))
  const cached = await kvs.getJson(`translation:${hashkey}`)

  if (cached) {
    return jsonResponse({ translations: cached.translations })
  } else {
    const res = await http.postJson(`https://translate.googleapis.com/v3beta1/projects/140437958737:translateText`, googleOptions, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const json = await res.json() as {
      translations: {
        translatedText: string
        model: string
        detectedLanguageCode: string
      }[]
    }
    const translations = json.translations.map(t => t.translatedText)
    await kvs.putJson(`translation:${hashkey}`, { translations })

    return jsonResponse({ translations })
  }
}