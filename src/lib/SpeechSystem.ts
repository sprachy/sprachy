import _ from "lodash"
import type { VoiceSynthesisRequestSchema } from "src/routes/api/synthesize"
import type { Character } from "./characters"
import type { SprachyUserSPA } from "./client/SprachyUserSPA"
import type { ReadingLine, FillblankLine, CharacterId } from "./Pattern"
import { sprachdex } from "./sprachdex"

export type SpeechOptions = {
  text: string
  voice?: Partial<VoiceSynthesisRequestSchema["voice"]>
  audioConfig?: Partial<VoiceSynthesisRequestSchema["audioConfig"]>
}

export class SpeechSystem {
  voice: SpeechSynthesisVoice | null = null
  currentlySaying: HTMLAudioElement | null = null

  constructor(readonly spa: SprachyUserSPA) { }

  async speakLine(line: ReadingLine | FillblankLine) {
    let text = line.message.replace(/[[_*]+/g, "")
    await this.characterSpeak(line.from, text)
  }

  async characterSpeak(characterId: CharacterId, text: string) {
    const character = sprachdex.getCharacter(characterId)
    return this.speak({
      text,
      voice: character.audio?.voice,
      audioConfig: character.audio?.audioConfig
    })
  }

  // TODO there's currently a DOS vulnerability here-- a hostile client can send infinitely varying
  // requests to the server, potentially causing google to charge us a large amount of money
  //
  // Solution for later: have server responsible for calculating the audio configuration, and the
  // client just sends a line identifier or such, so the set of possible speech is finite
  async speak(opts: SpeechOptions) {
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
        text: opts.text
      },
      voice: Object.assign(voiceDefaults, opts.voice),
      audioConfig: Object.assign(audioConfigDefaults, opts.audioConfig)
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