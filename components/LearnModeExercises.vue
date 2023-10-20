<script lang="ts" setup>
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
  },
  { immediate: true }
)

watchEffect(() => {
  if (speech.enabled) {
    for (const ex of state.exercises) {
      speech.preloadExercise(ex)
    }
  }
})

async function nextExercise() {
  // Completed an exercise, gain experience
  const expGained = 200
  progressStore.gainPatternExperience(props.learnable.pattern.id, expGained)

  if (props.learnable.pattern.progress.level > state.startLevel) {
    emit("complete")
  } else if (state.exerciseIndex >= state.exercises.length - 1) {
    state.exerciseIndex = 0
  } else {
    state.exerciseIndex += 1
  }
}
</script>

<!-- <svelte:head>
  {#each exercises as exercise}
    {#if "image" in exercise}
      <link rel="preload" as="image" href={exercise.image} />
    {/if}
  {/each}
</svelte:head> -->

<template>
  <div class="practice">
    <div class="exercises">
      <ExerciseView :pattern="learnable.pattern" :exercise="state.exercise" @correct="nextExercise" />
    </div>
  </div>
</template>

<style scoped>
.practice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem 0;
}
</style>
