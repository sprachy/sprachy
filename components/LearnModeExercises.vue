<script lang="ts" setup>
import { preloadExerciseAssets } from '~/lib/preloading'
import { delay } from '~/lib/util'

const props = defineProps<{
  learnable: Required<LearnablePattern>
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  startLevel: 0,
  exerciseIndex: 0,

  get exercises() {
    return props.learnable.data.exercises
  },

  get exercise() {
    return this.exercises[state.exerciseIndex]!
  }
})

watch(
  () => props.learnable,
  () => {
    state.startLevel = props.learnable.pattern.progress.level
    state.exerciseIndex = 0
    preloadExerciseAssets(props.learnable.data.exercises)
  },
  { immediate: true }
)

async function nextExercise() {
  // Completed an exercise, gain experience
  const expGained = 200
  progressStore.gainPatternExperience(props.learnable.pattern.id, expGained)

  if (props.learnable.pattern.progress.level > state.startLevel) {
    // Give the experience bar a moment to update
    await delay(1000)
    emit("complete")
  } else if (state.exerciseIndex >= state.exercises.length - 1) {
    state.exerciseIndex = 0
  } else {
    state.exerciseIndex += 1
  }
}
</script>

<template>
  <div class="practice">
    <div class="exercises">
      <ExerciseView :pattern="learnable.pattern" :exercise="state.exercise" @correct="nextExercise" />
    </div>
  </div>
</template>

<style scoped>
.practice {
  height: 100%;
  padding: 2rem 0;
}
</style>
