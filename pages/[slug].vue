<script setup lang="ts">
import { sprachdex } from "~/lib/sprachdex"
const { slug } = useRoute().params

const pattern = sprachdex.patterns.find(p => p.slug === slug)
if (!pattern) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>


<template>
  <main class="container">
    <PatternExplanation :pattern="pattern" />
  </main>
</template>