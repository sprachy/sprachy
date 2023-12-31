<script setup lang="ts">
import type { Base64Audio } from "~/composables/speech"
import SoundIndicator from "~/components/SoundIndicator.vue"
import type { Line } from "~/lib/Line"

const props = withDefaults(defineProps<{
  line: Line
  playImmediately?: boolean,
  completed?: boolean,
  disabled?: boolean,
}>(), {
  playImmediately: false,
  completed: false,
  disabled: false
})

const emit = defineEmits<{
  (e: "finished"): void
}>()

const state = defineState({
  loading: true,
  currentlyPlayingAudio: false,
  playedImmediateAudio: false,
  audio: undefined as Base64Audio | undefined,
  audioWhenCompleted: undefined as Base64Audio | undefined,

  get targetAudio() {
    return props.completed ? state.audioWhenCompleted : state.audio
  }
})

// Grab the audio for the line
// Ideally audio was preloaded already, but we don't assume it was
watch(
  () => speech.enabled && props.line,
  async () => {
    state.loading = true
    try {
      const [audio, audioWhenCompleted] = await Promise.all([
        speech.get(props.line.speechDef),
        speech.get(props.line.speechDefWhenCompleted)
      ])
      state.audio = audio
      state.audioWhenCompleted = audioWhenCompleted
    } finally {
      state.loading = false
    }
  },
  { immediate: true }
)

// If requested, play audio immediately after load
watch(
  () => state.audio,
  () => {
    if (state.audio && props.playImmediately && !state.playedImmediateAudio) {
      state.playedImmediateAudio = true
      playSound(state.audio)
    }
  },
  { immediate: true }
)

watch(
  () => props.completed,
  () => {
    if (props.completed && props.line.hasBlanks && state.audioWhenCompleted) {
      console.log("Playing completion")
      playSound(state.audioWhenCompleted)
    }
  }
)

async function playSound(audio: Base64Audio) {
  state.currentlyPlayingAudio = true
  try {
    await speech.playAudioContent(audio)
  } finally {
    state.currentlyPlayingAudio = false
    emit("finished")
  }
}

onUnmounted(() => {
  // User muted the sound or went to another page, stop playing
  if (state.currentlyPlayingAudio) speech.skip()
})
</script>

<template>
  <SoundIndicator v-if="speech.enabled" :loading="state.loading" :playing="state.currentlyPlayingAudio"
    @click.prevent="() => (props.disabled || !state.targetAudio) ? null : playSound(state.targetAudio)" />
</template>
