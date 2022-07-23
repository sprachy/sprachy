<script lang="ts">
  import _ from "lodash"
  import type { FillblankLine, ReadingLine } from "$lib/Pattern"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"
  import type { Base64Audio } from "$lib/SpeechSystem"

  export let line: ReadingLine | FillblankLine
  export let audioPromise: Promise<Base64Audio> | undefined
  export let playImmediately: boolean = false

  const { speech } = sprachy.expectSPA()
  let playingSound: boolean = false
  let loading = true
  let audio: Base64Audio | undefined
  let playedOnLoad: boolean = false

  async function loadAudio() {
    loading = true
    try {
      audio = await audioPromise
    } finally {
      loading = false
    }

    if (playImmediately) {
      playedOnLoad = true
      playSound()
    }
  }

  loadAudio()

  async function playSound() {
    if (!audio) return

    playingSound = true
    try {
      await speech.speak(audio)
    } finally {
      playingSound = false
    }
  }

  $: if (playImmediately && !playedOnLoad) {
    playSound()
  }
</script>

<SoundIndicator {loading} playing={playingSound} on:click={playSound} />
