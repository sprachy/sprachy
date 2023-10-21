import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'
import { readFiles } from 'h3-formidable'
import { R2 } from './r2'

export default defineEventHandler(async (event) => {
  const { files } = await readFiles(event)
  const file = files[0]!

  const img = await sharp(file).webp().toBuffer()
  const hash = crypto.createHash('md5')
    .update(img)
    .digest("hex")

  await R2.send(new PutObjectCommand({
    Bucket: 'images',
    Key: `${hash}.webp`,
    Body: img,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }))

  return hash
})
