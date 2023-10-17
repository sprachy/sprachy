<script lang="ts" setup>
import type { LearnablePattern } from "~/composables/progressStore"
import PatternExplanation from "./PatternExplanation.vue"

const props = defineProps<{
  learnable: LearnablePattern
}>()

const { data: patternData } = await useAsyncData(`pattern/${props.learnable.pattern.id}`,
  () => sprachdex.fetchPatternById(props.learnable.pattern.id)
)

const emit = defineEmits<{
  (e: "complete"): void
}>()
</script>

<template>
  <article class="explanation" v-if="patternData">
    <h1>{{ learnable.pattern.title }}</h1>
    <PatternExplanation :pattern="patternData" />
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
