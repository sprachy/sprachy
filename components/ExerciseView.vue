<script setup lang="ts">
import type { Exercise } from "~/lib/Exercise"
import ExerciseViewFillblank from "~/components/ExerciseViewFillblank.vue"
import ExerciseViewChoice from "~/components/ExerciseViewChoice.vue"
import type { Pattern } from "~/lib/Pattern"

defineProps<{
  exercise: Exercise
  pattern: Pattern
}>()

const emit = defineEmits<{
  (event: "correct"): void
}>()
</script>

<template>
  <ExerciseViewFillblank v-if="exercise.type === 'fillblank'" :exercise="exercise" :pattern="pattern"
    @correct="emit('correct')" />
  <ExerciseViewChoice v-else-if="exercise.type === 'choice'" :exercise="exercise" @correct="emit('correct')" />
</template>