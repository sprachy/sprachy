<script lang="ts" setup>
import type { LearnablePattern } from "~/composables/progressStore"
import PatternExplanation from "./PatternExplanation.vue"

const props = defineProps<{
  learnable: Required<LearnablePattern>
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()
</script>

<template>
  <article class="explanation" v-if="learnable.data">
    <h1>{{ learnable.pattern.title }}</h1>
    <PatternExplanation :pattern="learnable.data" />
    <button class="btn btn-success" @click="emit('complete')">
      Continue to exercises
    </button>
  </article>
</template>

<style scoped>
article {
  max-width: 800px;
  margin: auto;
  padding: 0 1rem;
  padding-bottom: 4rem;
}
</style>
