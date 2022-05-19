import _ from "lodash"
import type { StoryLine } from "./Pattern"
import { sprachdex } from "./sprachdex"

export class SpeechSystem {
  voice: SpeechSynthesisVoice | null = null
  constructor() { }

  async loadVoices(): Promise<SpeechSynthesisVoice[]> {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0)
      return voices

    // Voices haven't loaded yet, wait for them
    return await new Promise((resolve, reject) => {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices())
      }
    })
  }

  async getVoice() {
    if (this.voice) return this.voice

    const allVoices = await this.loadVoices()
    const germanVoices = allVoices.filter((v) => v.lang === "de-DE")

    const voicePrefs = _.sortBy(germanVoices, (v) =>
      v.name.startsWith("Google") ? -1 : 0
    )
    this.voice = voicePrefs[0] || null
    return this.voice
  }

  async speak(line: StoryLine) {
    const voice = await this.getVoice()
    if (!voice) return
    await new Promise<void>((resolve) => {
      const text = line.message.replace(/[[_*]+/g, "")
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = "de"
      utter.voice = voice
      const character = sprachdex.getCharacter(line.from)
      utter.rate = character.rate || 1.0
      utter.pitch = character.pitch || 1.0
      utter.onend = () => resolve()
      speechSynthesis.speak(utter)
    })
  }
}