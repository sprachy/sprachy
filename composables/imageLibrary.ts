const glob = import.meta.glob('~/assets/*.webp', { eager: true })
export const imageLibrary = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [key.split('/').slice(-1)[0], (value as any).default as string])
)
export function getUploadedImageUrl(path: string) {
  return `https://images.sprachy.com/${path}`
}
