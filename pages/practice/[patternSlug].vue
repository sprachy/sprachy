<script setup lang="ts">
import { sprachdex } from "~/lib/sprachdex"
const { patternSlug } = useRoute().params

const pattern = sprachdex.patterns.find(p => p.slug === patternSlug)
if (!pattern) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const state = defineState({
  exerciseIndex: 0,

  get exercise() {
    return pattern.exercises[state.exerciseIndex]
  }
})

function nextExercise() {
  state.exerciseIndex++
}
</script>


<template>
  <main class="container">
    <h1>{{ pattern.title }}</h1>
    <ExerciseView @correct="nextExercise" v-if="state.exercise" :exercise="state.exercise" :pattern="pattern" />
    <p v-else>
      All exercises complete!
    </p>
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>