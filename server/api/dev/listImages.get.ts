import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { R2 } from './r2'
import { sortBy } from 'lodash-es'

export default defineEventHandler(async (event) => {
  const res = await R2.send(new ListObjectsV2Command({
    Bucket: 'images',
  }))

  if (!res.Contents)
    return []

  const images = res.Contents.map(item => ({
    path: item.Key!,
    size: item.Size!,
    lastModified: item.LastModified!.getTime(),
  } satisfies UploadedImageListItem))

  const sortedImages = sortBy(images, img => -img.lastModified)

  return sortedImages
})
