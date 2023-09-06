<script setup lang="ts">
import { sprachdex } from "~/lib/sprachdex"
const { patternSlug } = useRoute().params

const pattern = sprachdex.patterns.find(p => p.slug === patternSlug)
if (!pattern) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>


<template>
  <main class="container">
    <h1>{{ pattern.title }}</h1>
    <PatternExplanation :pattern="pattern" />
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>