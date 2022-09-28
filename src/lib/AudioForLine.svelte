<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"
  import type { SpeechSystem, Base64Audio } from "$lib/SpeechSystem"
  import { onDestroy } from "svelte"

  export let playImmediately: boolean = false
  export let disabled: boolean = false
  export let opts: Partial<Parameters<SpeechSystem["get"]>[0]>

  const { speech, user } = sprachy.expectSPA()
  let playingSound: boolean = false
  let loading = true
  let audio: Base64Audio | undefined
  let playedOnLoad: boolean = false

  $: audioOpts =
    opts.from && opts.message
      ? { from: opts.from, message: opts.message }
      : undefined
  $: enabled = $user?.enableSpeechSynthesis && audioOpts

  async function loadAudio() {
    loading = true
    try {
      audio = await speech.get(audioOpts!)
    } finally {
      loading = false
    }

    if (playImmediately) {
      playedOnLoad = true
      playSound()
    }
  }

  $: if (enabled) {
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
