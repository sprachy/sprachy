<script setup lang="ts">
import { sprachdex } from "~/lib/sprachdex"
const { patternSlug } = useRoute().params

const pattern = sprachdex.patterns.find(p => p.slug === patternSlug)
if (!pattern) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const exercise = pattern.exercises[0]

const ready = process.client
</script>


<template>
  <main v-if="ready" class="container">
    <h1>{{ pattern.title }}</h1>
    <ExerciseView :exercise="exercise" />
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>