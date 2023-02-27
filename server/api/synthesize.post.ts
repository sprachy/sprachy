import * as z from 'zod'
import http from '~/server/http'
import { env } from "~/server/env"
import { kvs } from "~/server/kvs"
import SparkMD5 from "spark-md5"

// @ts-ignore
import { getGoogleAuthToken } from "~/server/getGoogleAuthToken"

const synthesizeSchema = z.object({
  // Our endpoint just sends the request straight through to Google Cloud (w/ caching)
  // So these options are from https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
  input: z.union([
    z.object({
      text: z.string()
    }),
    z.object({
      ssml: z.string()
    })
  ]),
  voice: z.object({
    // See voice options at https://cloud.google.com/text-to-speech/docs/voices
    languageCode: z.string(),
    name: z.string(),
    ssmlGender: z.enum(['MALE', 'FEMALE', 'NEUTRAL'])
  }),
  audioConfig: z.object({
    audioEncoding: z.enum(['LINEAR16', 'MP3', 'OGG_OPUS', 'MULAW', 'ALAW']),
    speakingRate: z.optional(z.number().min(0.25).max(4.0)),
    pitch: z.optional(z.number().min(-20.0).max(20.0)),
    volumeGainDb: z.optional(z.number().min(-96.0).max(16.0)),
    sampleRateHertz: z.optional(z.number().int()),
    effectsProfileId: z.optional(z.array(z.string()))
  })
})

export type VoiceSynthesisSchema = z.infer<typeof synthesizeSchema>


export default defineEventHandler(async (event) => {
  const options = synthesizeSchema.parse(await readBody(event))

  const credentials = JSON.parse(atob(env.GOOGLE_CLOUD_CREDENTIALS!))
  const accessToken = await getGoogleAuthToken(credentials.client_email, credentials.private_key, "https://www.googleapis.com/auth/cloud-platform")

  const hashkey = SparkMD5.hash(JSON.stringify(options))
  let audioContent = await kvs.getText(`voiceSynthesis:${hashkey}`)

  if (audioContent) {
    return { audioContent }
  } else {
    const res = await http.postJson(`https://texttospeech.googleapis.com/v1/text:synthesize`, options, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const json = await res.json() as { audioContent: string }
    audioContent = json.audioContent
    await kvs.putText(`voiceSynthesis:${hashkey}`, audioContent)

    return { audioContent }
  }
})