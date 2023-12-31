import type { Exercise } from "~/lib/Exercise"
import type { VoiceSynthesisSchema } from "~/server/api/synthesize.post"

export type VoiceSynthesisOptions = {
  text: string
  voice?: Partial<VoiceSynthesisSchema["voice"]>
  audioConfig?: Partial<VoiceSynthesisSchema["audioConfig"]>
}

export type Base64Audio = string

export type SpeechDef = {
  from: string
  message: string
}

export class SpeechSystem {
  enabled: boolean = false
  audioRequests: Record<string, Promise<Base64Audio>> = {}
  audioCache: Record<string, Base64Audio> = {}
  currentlySaying: {
    audioContent: Base64Audio,
    el: HTMLAudioElement
  } | null = null

  constructor() { }

  loadMute() {
    this.enabled = !clientStorage.getJSON('muteAudio')
  }

  toggleMute() {
    this.enabled = !this.enabled
    if (this.enabled) {
      clientStorage.deleteJSON('muteAudio')
    } else {
      clientStorage.setJSON('muteAudio', true)
    }
  }

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
    if (!this.enabled) return

    const snd = new Audio("data:audio/wav;base64," + audioContent)

    if (this.currentlySaying) {
      // Skip any current speech in favor of new one, so we're not
      // playing two voices at once
      this.skip()
    }

    this.currentlySaying = { el: snd, audioContent }
    const promise = new Promise<void>(resolve => {
      const onEnd = () => {
        if (this.currentlySaying?.el === snd) {
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

    const cachedAudio = this.audioCache[key]
    if (cachedAudio)
      return cachedAudio

    let pendingAudio = this.audioRequests[key]
    if (pendingAudio)
      return pendingAudio

    pendingAudio = this.synthesizeFromCharacter(opts.from, opts.message)
    this.audioRequests[key] = pendingAudio
    pendingAudio.then(v => {
      this.audioCache[key] = v
      delete this.audioRequests[key]
    })
    return pendingAudio
  }

  tryGetCached(def: SpeechDef) {
    return this.audioCache[def.from + ' ' + def.message]
  }

  async get(def: SpeechDef) {
    const key = def.from + ' ' + def.message
    const audio = this.audioCache[key]
    if (audio) {
      return audio
    } else {
      console.warn("Audio \"" + key + "\" has not been preloaded.")
      return this.preload(def)
    }
  }

  /**
   * Skip any currently playing speech and continue.
   */
  async skip() {
    // https://stackoverflow.com/questions/14834520/html5-audio-stop-function
    if (this.currentlySaying) {
      this.currentlySaying.el.pause()
      this.currentlySaying.el.currentTime = 0
    }
  }
}

export const speech = defineState(new SpeechSystem())