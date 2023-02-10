<script setup lang="ts">
import type { SpeechSystem, Base64Audio } from "~/lib/SpeechSystem"
import SoundIndicator from "~/components/SoundIndicator.vue"

const props = withDefaults(defineProps<{
  opts: Partial<Parameters<SpeechSystem["get"]>[0]>
  playImmediately?: boolean,
  disabled?: boolean,
}>(), {
  playImmediately: false,
  disabled: false
})

defineExpose({
  playSound
})

const { speech, user } = useSprachyApp()

const state = useLocalReactive({
  playingSound: false,
  loading: true,
  audio: undefined as Base64Audio | undefined,

  get audioOpts() {
    return props.opts.from && props.opts.message
      ? { from: props.opts.from, message: props.opts.message }
      : undefined
  },

  get enabled() {
    return user.enableSpeechSynthesis && this.audioOpts
  }
})

async function loadAudio() {
  state.loading = true
  try {
    state.audio = await speech.get(state.audioOpts!)
  } finally {
    state.loading = false
  }

  if (props.playImmediately) {
    playSound()
  }
}

watchEffect(() => {
  if (state.enabled && !state.audio) {
    loadAudio()
  }
})

async function playSound() {
  if (!state.audio) return

  state.playingSound = true
  try {
    await speech.playAudioContent(state.audio)
  } finally {
    state.playingSound = false
  }
}

onUnmounted(() => {
  // User muted the sound or went to another page, stop playing
  if (state.playingSound) speech.skip()
})
</script>

<template>
  <SoundIndicator v-if="state.enabled" :loading="state.loading" :playing="state.playingSound"
    @click.prevent="props.disabled ? () => null : playSound" />
</template>
