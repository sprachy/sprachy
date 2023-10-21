import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { R2 } from './r2'

export default defineEventHandler(async (event) => {
  const res = await R2.send(new ListObjectsV2Command({
    Bucket: 'images',
  }))

  return res.Contents
})
