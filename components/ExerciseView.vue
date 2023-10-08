<script setup lang="ts">
// import type { Exercise } from "~/lib/Exercise"
// import ExerciseViewFillblank from "~/components/ExerciseViewFillblank.vue"
import ExerciseViewChoice from "~/components/ExerciseViewChoice.vue"
import type { Pattern } from "~/lib/Pattern"
import type { Exercise } from "~/lib/Exercise"
import { checkAudioPlayability } from "~/lib/util"

const state = defineState({
  ready: false
})

const props = defineProps<{
  exercise: Exercise
  pattern: Pattern
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
    <ExerciseViewFillblank v-if="exercise.type === 'fillblank'" :key="exercise.message" :exercise="exercise"
      :pattern="pattern" @correct="emit('correct')" />
    <ExerciseViewChoice v-else-if="props.exercise.type === 'choice'" :exercise="props.exercise"
      @correct="emit('correct')" />
    <p v-else>
      Unknown exercise type: {{ props.exercise.type }}
    </p>
  </template>
</template>