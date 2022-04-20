import _ from "lodash"
import type { SprachyUserSPA } from "./client/SprachyUserSPA"
import type { StoryLine } from "./Pattern"
import { sprachdex } from "./sprachdex"

export class SpeechSystem {
  constructor(spa: SprachyUserSPA) { }

  get speechSynthesisVoice(): SpeechSynthesisVoice | null {
    const options = { voice: null }

    const germanVoices = speechSynthesis
      .getVoices()
      .filter((v) => v.lang === "de-DE")

    const voice = germanVoices.find((v) => v.name === options.voice)
    if (voice) return voice

    const voicePrefs = _.sortBy(germanVoices, (v) =>
      v.name.startsWith("Google") ? -1 : 0
    )
    return voicePrefs[0] || null
  }

  speak(line: StoryLine) {
    return new Promise<void>((resolve) => {
      const voice = this.speechSynthesisVoice
      if (voice) {
        const text = line.message.replace(/[[_*]+/g, "")
        const utter = new SpeechSynthesisUtterance(text)
        utter.lang = "de"
        utter.voice = voice
        const character = sprachdex.getCharacter(line.from)
        utter.rate = character.rate || 1.0
        utter.pitch = character.pitch || 1.0
        utter.onend = (ev) => resolve()
        speechSynthesis.speak(utter)
      }
    })
  }
}