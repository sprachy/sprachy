import type { Dialogue } from "./Dialogue"
import type { Exercise } from "./Exercise"

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
      preloadImage(imageLibrary[ex.image])
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