import type { Dialogue } from "./Dialogue"
import type { Exercise } from "./Exercise"
import type { Line } from "./Line"

const preloadedImages: Record<string, boolean> = {}
export async function preloadImage(href: string) {
  if (href in preloadedImages) return

  const el = document.createElement('link')
  el.rel = 'prefetch'
  el.as = 'image'
  el.href = href
  document.head.appendChild(el)

  preloadedImages[href] = true
}

export async function preloadLineAssets(lines: Line[]) {
  for (const line of lines) {
    if (line.image) {
      preloadImage(getUploadedImageUrl(line.image))
    }
    if (line.speechDef) {
      speech.preload(line.speechDef)
    }
    if (line.hasBlanks && line.speechDefWhenCompleted) {
      speech.preload(line.speechDefWhenCompleted)
    }
    if (line.from) {
      preloadImage(sprachdex.getCharacter(line.from).avatar)
    }
    if (line.choices) {
      for (const choice of line.choices) {
        speech.preload({ from: line.responder || 'narrator', message: choice.text })
      }
    }
  }
}

export async function preloadExerciseAssets(exercises: Exercise[]) {
  return Promise.all(exercises.map(ex => preloadLineAssets(ex.lines)))
}

export async function preloadDialogueAssets(dialogue: Dialogue) {
  return preloadLineAssets(dialogue.lines)
}