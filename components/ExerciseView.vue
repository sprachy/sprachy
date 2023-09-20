<script setup lang="ts">
// import type { Exercise } from "~/lib/Exercise"
import ExerciseViewFillblank from "~/components/ExerciseViewFillblank.vue"
import ExerciseViewChoice from "~/components/ExerciseViewChoice.vue"
import type { Pattern } from "~/lib/Pattern"
import type { Exercise } from "~/lib/Exercise"

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

console.log(props.exercise)
</script>

<template>
  <button class="btn btn-sprachy" v-if="!state.ready" @click="state.ready = true">
    Start
  </button>
  <template v-else>
    <!-- <ExerciseViewFillblank v-if="exercise.type === 'fillblank'" :exercise="exercise" :pattern="pattern"
    @correct="emit('correct')" /> -->
    <ExerciseViewChoice v-if="exercise.type === 'choice'" :exercise="exercise" @correct="emit('correct')" />
  </template>
</template>