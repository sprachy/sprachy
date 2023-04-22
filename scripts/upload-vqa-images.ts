import { prisma } from '../server/prisma'
import fs from 'fs/promises'
import { VQATask } from '../lib/VQATask'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

async function uploadImage(filepath: string) {
  const origImg = await fs.readFile(filepath)

  const img = await sharp(origImg).webp().toBuffer()

  const hash = crypto.createHash('md5')
    .update(img)
    .digest("hex")

  await S3.send(new PutObjectCommand({
    Bucket: 'images',
    Key: `${hash}.webp`,
    Body: img,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }))

  return hash
}

async function main() {
  const tasks = await prisma.taskDefVQA.findMany()

  for (const def of tasks) {
    const task = new VQATask(def)
    if (task.imageId.length < 32) {
      const path = `./public${task.imgUrl}`
      const hash = await uploadImage(path)
      await prisma.taskDefVQA.update({
        where: { id: def.id },
        data: { imageId: hash },
      })
      console.log(`${hash}.webp`)
    }
  }
}

main()