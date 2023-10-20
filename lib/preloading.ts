import type { Dialogue } from "./Dialogue"

export async function preloadImage(href: string) {
  const el = document.createElement('link')
  el.rel = 'preload'
  el.as = 'image'
  el.href = href
  document.head.appendChild(el)
}

export async function preloadDialogueAssets(dialogue: Dialogue) {
  for (const line of dialogue.lines) {
    if ('image' in line && line.image) {
      preloadImage(imageLibrary[line.image])
    }
    if (line.type === 'reading' && line.from && line.message) {
      speech.preload({ from: line.from, message: line.message })
    }
  }
}