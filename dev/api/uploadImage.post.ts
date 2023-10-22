import { defineEventHandler, readMultipartFormData } from 'h3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'
import { R2 } from './r2'

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event)
  const file = data ? data[0] : null

  if (!file) {
    throw createError({
      statusCode: 400,
      message: 'No file provided',
    })
  }

  const basename = file.filename!.split('.').slice(0, -1).join('.')
  const img = await sharp(file.data).resize({ width: 1200, height: 628, fit: 'inside' }).webp().toBuffer()
  const hash = crypto.createHash('md5')
    .update(img)
    .digest("hex")

  const path = `${hash}-${basename}.webp`

  await R2.send(new PutObjectCommand({
    Bucket: 'images',
    Key: path,
    Body: img,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }))

  return {
    path,
    size: file.data.length,
    lastModified: Date.now()
  }
})
