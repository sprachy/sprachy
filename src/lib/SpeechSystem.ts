import _ from "lodash"
import type { Character } from "./characters"
import type { SprachyUserSPA } from "./client/SprachyUserSPA"
import type { ReadingLine, FillblankLine } from "./Pattern"
import { sprachdex } from "./sprachdex"

export class SpeechSystem {
  voice: SpeechSynthesisVoice | null = null
  currentlySaying: HTMLAudioElement | null = null

  constructor(readonly spa: SprachyUserSPA) { }

  async loadVoices(): Promise<SpeechSynthesisVoice[]> {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0)
      return voices

    // Voices haven't loaded yet, wait for them
    return await new Promise((resolve) => {
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

  async speak(line: ReadingLine | FillblankLine) {
    let text = line.message.replace(/[[_*]+/g, "")
    const character = sprachdex.getCharacter(line.from)
    this.characterSpeak(character, text)
  }

  async characterSpeak(character: Character, text: string) {
    const voiceDefaults = {
      languageCode: "de-DE",
      name: "de-DE-Wavenet-C",
      ssmlGender: "FEMALE"
    }

    const audioConfigDefaults = {
      audioEncoding: 'MP3'
    }

    const { audioContent } = await this.spa.api.synthesizeSpeech({
      input: {
        text
      },
      voice: Object.assign(voiceDefaults, character.audio?.voice),
      audioConfig: Object.assign(audioConfigDefaults, character.audio?.audioConfig)
    })

    const snd = new Audio("data:audio/wav;base64," + audioContent)

    if (this.currentlySaying) {
      this.currentlySaying.pause()
      this.currentlySaying.currentTime = 0
    }

    this.currentlySaying = snd
    snd.addEventListener('onended', () => {
      if (this.currentlySaying === snd) {
        this.currentlySaying = null
      }
    })
    snd.play()

    // const voice = await this.getVoice()
    // if (!voice) return
    // return new Promise<void>((resolve) => {
    //   let text = line.message.replace(/[[_*]+/g, "")
    //   const character = sprachdex.getCharacter(line.from)
    //   let rate = character.rate || 1.0
    //   let pitch = character.pitch || 1.0

    //   if ('alien' in line && line.alien) {
    //     text = text.split("").reverse().join("")
    //     rate = 2.0
    //   }

    //   const utter = new SpeechSynthesisUtterance(text)
    //   utter.lang = "de"
    //   utter.voice = voice
    //   utter.rate = rate
    //   utter.pitch = pitch
    //   utter.onend = () => resolve()
    //   speechSynthesis.speak(utter)
    // })
  }
}