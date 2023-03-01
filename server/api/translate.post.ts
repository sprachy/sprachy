import * as z from 'zod'
import http from '~/server/http'
import { env } from "~/server/env"
import { kvs } from "~/server/kvs"
import SparkMD5 from "spark-md5"

// @ts-ignore
import { getGoogleAuthToken } from "~/server/getGoogleAuthToken"

const translateSchema = z.object({
  from: z.string(),
  to: z.string(),
  texts: z.array(z.string())
})

export type TranslateSchema = z.infer<typeof translateSchema>

export default defineEventHandler(async (event) => {
  const options = translateSchema.parse(await readBody(event))

  const googleOptions = {
    contents: options.texts,
    sourceLanguageCode: options.from,
    targetLanguageCode: options.to
  }

  const credentials = JSON.parse(atob(env.GOOGLE_CLOUD_CREDENTIALS!))
  const accessToken = await getGoogleAuthToken(credentials.client_email, credentials.private_key, "https://www.googleapis.com/auth/cloud-platform")

  const hashkey = SparkMD5.hash(JSON.stringify(options))
  const cached = await kvs.getJson(`translation:${hashkey}`) as { translations: string[] } | undefined

  if (cached) {
    return { translations: cached.translations }
  } else {
    const res = await http.post(`https://translate.googleapis.com/v3beta1/projects/140437958737:translateText`, googleOptions, {
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

    return { translations }
  }
})