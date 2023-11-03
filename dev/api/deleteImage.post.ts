import { defineEventHandler, readBody } from 'h3'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { R2 } from './r2'
import * as z from 'zod'

const deleteImageSchema = z.object({
  path: z.string()
})

export default defineEventHandler(async (event) => {
  const { path } = deleteImageSchema.parse(await readBody(event))

  await R2.send(new DeleteObjectCommand({
    Bucket: 'images',
    Key: path
  }))

  return {
    deleted: path
  }
})
