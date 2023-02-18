<script setup lang="ts">
import type { LearningPattern } from "~/lib/SprachyUserSPA"
import PatternExplanation from "./PatternExplanation.vue"

const spa = useSprachyApp()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  get learning() {
    return spa.learning as LearningPattern
  }
})

async function explanationRead() {
  emit("complete")
}
</script>

<template>
  <article class="explanation">
    <h1>
      {{ state.learning.pattern.title }}
    </h1>
    <PatternExplanation :pattern="state.learning.pattern" />
    <button class="btn btn-success" @click="explanationRead">
      Continue to exercises
    </button>
  </article>
</template>

<style>
article {
  max-width: 800px;
  margin: auto;
  padding: 0 1rem;
  padding-bottom: 4rem;
}
</style>
