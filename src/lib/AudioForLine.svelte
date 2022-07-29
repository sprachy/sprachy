<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"
  import type { Base64Audio } from "$lib/SpeechSystem"
  import { onDestroy } from "svelte"

  export let audioPromise: Promise<Base64Audio> | undefined
  export let playImmediately: boolean = false
  export let disabled: boolean = false

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

  $: if (audioPromise) {
    loadAudio()
  }

  export async function playSound() {
    if (!audio) return

    playingSound = true
    try {
      await speech.speak(audio)
    } finally {
      playingSound = false
    }
  }

  onDestroy(() => {
    // User muted the sound or went to another page, stop playing
    if (playingSound) speech.skip()
  })

  $: if (playImmediately && !playedOnLoad) {
    playSound()
  }
</script>

<SoundIndicator
  {loading}
  playing={playingSound}
  on:click={disabled ? () => null : playSound}
/>
