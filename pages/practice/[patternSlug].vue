<script setup lang="ts">
definePageMeta({
  layout: 'toc'
})

import { parsePattern } from '~/lib/Pattern'
import { preloadExerciseAssets } from '~/lib/preloading'

const { patternSlug } = useRoute().params

const { data: patternData, error } = await useAsyncData(`pattern/${patternSlug}`,
  () => queryContent(`/${patternSlug}`).findOne()
)

const pattern = computed(() => patternData.value ? parsePattern(patternData.value as any) : null)

if (error.value) {
  throw createError(error.value)
}

const state = defineState({
  exerciseIndex: 0,

  get exercises() {
    return pattern.value?.exercises || []
  },

  get exercise() {
    return this.exercises[state.exerciseIndex]
  }
})

watchEffect(() => {
  if (process.browser && pattern.value)
    preloadExerciseAssets(pattern.value.exercises)
})

function nextExercise() {
  state.exerciseIndex++
}
</script>


<template>
  <main class="container" v-if="pattern">
    <h1 class="text-center">Practice: {{ pattern.title }}</h1>
    <ExerciseView :key="state.exerciseIndex" @correct="nextExercise" v-if="state.exercise" :exercise="state.exercise"
      :pattern="pattern" />
    <p v-else>
      All exercises complete!
    </p>
  </main>
</template>

<style scoped>
main.container {
  padding-top: 1rem;
  max-width: 800px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>