import type { Dialogue } from "./Dialogue"
import type { Exercise } from "./Exercise"

const preloadedImages: Record<string, boolean> = {}
export async function preloadImage(href: string) {
  if (href in preloadedImages) return
  console.log(href)

  const el = document.createElement('link')
  el.rel = 'prefetch'
  el.as = 'image'
  el.href = href
  document.head.appendChild(el)

  preloadedImages[href] = true
}

export async function preloadDialogueAssets(dialogue: Dialogue) {
  for (const line of dialogue.lines) {
    if ('image' in line && line.image) {
      preloadImage(getUploadedImageUrl(line.image))
    }
    if (line.type === 'reading' && line.message) {
      speech.preload({ from: line.from || 'narrator', message: line.message })
    }
    if (line.type === 'reading' && line.from) {
      preloadImage(sprachdex.getCharacter(line.from).avatar)
    }
    if (line.type === 'choice') {
      if (line.question)
        speech.preload({ from: 'narrator', message: line.question })
      if (line.choices) {
        for (const choice of line.choices) {
          speech.preload({ from: 'narrator', message: choice.text })
        }
      }
    }
  }
}

export async function preloadExerciseAssets(exercises: Exercise[]) {
  for (const ex of exercises) {
    if (ex.image) {
      preloadImage(getUploadedImageUrl(ex.image))
    }
    if (ex.from) {
      preloadImage(sprachdex.getCharacter(ex.from).avatar)
    }
    if (ex.message) {
      speech.preload({ from: ex.from || 'narrator', message: ex.message })
    }
    if ('choices' in ex) {
      for (const choice of ex.choices) {
        speech.preload({ from: 'narrator', message: choice.text })
      }
    }
  }
}