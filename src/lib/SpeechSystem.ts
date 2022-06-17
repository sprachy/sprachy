import _ from "lodash"
import type { Character } from "./characters"
import type { SprachyUserSPA } from "./client/SprachyUserSPA"
import type { ReadingLine, FillblankLine } from "./Pattern"
import { sprachdex } from "./sprachdex"

export class SpeechSystem {
  voice: SpeechSynthesisVoice | null = null
  currentlySaying: HTMLAudioElement | null = null

  constructor(readonly spa: SprachyUserSPA) { }

  async speak(line: ReadingLine | FillblankLine) {
    let text = line.message.replace(/[[_*]+/g, "")
    const character = sprachdex.getCharacter(line.from)
    await this.characterSpeak(character, text)
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
    const promise = new Promise<void>((resolve, reject) => {
      const onEnd = () => {
        if (this.currentlySaying === snd) {
          this.currentlySaying = null
        }
        resolve()
      }
      snd.addEventListener('ended', onEnd)
      snd.addEventListener('pause', onEnd)
    })

    await snd.play()
    return promise
  }
}