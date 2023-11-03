<script setup lang="ts">
import type { Exercise } from "~/lib/Exercise"
import type { PatternNavigationItem } from "~/lib/Pattern"
import { checkAudioPlayability } from "~/lib/util"
import InteractiveSequence from "./InteractiveSequence.vue"

const state = defineState({
  ready: false
})

defineProps<{
  exercise: Exercise
  pattern: PatternNavigationItem
}>()

const emit = defineEmits<{
  (event: "correct"): void
}>()

onMounted(async () => {
  if (!speech.enabled || await checkAudioPlayability()) {
    state.ready = true
  }
})
</script>

<template>
  <button class="btn btn-sprachy" v-if="!state.ready" @click="state.ready = true">
    Start
  </button>
  <template v-else>
    <InteractiveSequence ref="seqRef" :lines="exercise.lines" @complete="emit('correct')" />
  </template>
</template>