import _ from "lodash"
import type { VoiceSynthesisSchema } from "~/server/api/synthesize.post"

export type VoiceSynthesisOptions = {
  text: string
  voice?: Partial<VoiceSynthesisSchema["voice"]>
  audioConfig?: Partial<VoiceSynthesisSchema["audioConfig"]>
}

export type Base64Audio = string

export class SpeechSystem {
  enabled: boolean = true
  audioCache: Record<string, Promise<Base64Audio>> = {}
  currentlySaying: HTMLAudioElement | null = null

  constructor() { }

  async synthesizeFromCharacter(characterId: string, text: string): Promise<Base64Audio> {
    const character = sprachdex.getCharacter(characterId)
    return this.synthesize({
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
  async synthesize(opts: VoiceSynthesisOptions): Promise<Base64Audio> {
    const voiceDefaults = {
      languageCode: "de-DE",
      name: "de-DE-Wavenet-C",
      ssmlGender: "FEMALE"
    }

    const audioConfigDefaults = {
      audioEncoding: 'MP3'
    }

    // Strip any unspeakable characters (e.g. fillblank markup or emoji)
    let text = opts.text.replace(/[^a-zA-Z0-9,.!?:;üäöß ]/g, "")

    const { audioContent } = await api.synthesizeSpeech({
      input: {
        text: text
      },
      voice: Object.assign(voiceDefaults, opts.voice),
      audioConfig: Object.assign(audioConfigDefaults, opts.audioConfig)
    })

    return audioContent
  }

  async playAudioContent(audioContent: Base64Audio) {
    const snd = new Audio("data:audio/wav;base64," + audioContent)

    if (this.currentlySaying) {
      // Skip any current speech in favor of new one, so we're not
      // playing two voices at once
      this.skip()
    }

    this.currentlySaying = snd
    const promise = new Promise<void>(resolve => {
      const onEnd = () => {
        if (this.currentlySaying === snd) {
          this.currentlySaying = null
        }
        resolve()
      }
      snd.addEventListener('ended', onEnd)
      snd.addEventListener('pause', onEnd)
    })

    await Promise.race([snd.play(), promise])
    return promise
  }

  async preload(opts: { from: string, message: string }) {
    const key = opts.from + ' ' + opts.message

    let audioPromise = this.audioCache[key]
    if (audioPromise) {
      return audioPromise
    } else {
      audioPromise = this.synthesizeFromCharacter(opts.from, opts.message)
      this.audioCache[key] = audioPromise
      return audioPromise
    }
  }

  async get(opts: { from: string, message: string }) {
    const key = opts.from + ' ' + opts.message
    const promise = this.audioCache[key]
    if (promise) {
      return promise
    } else {
      console.warn("Audio \"" + key + "\" has not been preloaded.")
      return this.preload(opts)
    }
  }

  async say(opts: { from: string, message: string }) {
    const audioContent = await this.get(opts)
    return this.playAudioContent(audioContent)
  }

  /**
   * Skip any currently playing speech and continue.
   */
  async skip() {
    // https://stackoverflow.com/questions/14834520/html5-audio-stop-function
    if (this.currentlySaying) {
      this.currentlySaying.pause()
      this.currentlySaying.currentTime = 0
    }
  }
}

export const speech = new SpeechSystem()