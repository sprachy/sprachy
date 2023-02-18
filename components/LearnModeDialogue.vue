<script setup lang="ts">
import InteractiveDialogue from "./InteractiveDialogue.vue"
import type { Pattern } from "~/lib/Pattern"

const spa = useSprachyApp()

const props = defineProps<{
  pattern: Pattern
}>()

const state = defineState({
  promptToBegin: true,
  readingExplanation: false,

  get progress() {
    return spa.progressByPatternId[props.pattern.id]!
  }
})

const emit = defineEmits<{
  (event: 'complete'): void
}>()

async function completeDialogue() {
  if (state.progress.experience < 1000) {
    await spa.gainPatternExperience(props.pattern.id, 1000)
  }
  emit("complete")
}
</script>

<template>
  <div class="dialogueContainer">
    <div v-if="state.promptToBegin" class="prompt">
      <h1>{{ props.pattern.storyTitle }}</h1>
      <button class="btn btn-success" @click="state.promptToBegin = false">
        Start dialogue
      </button>
    </div>
    <InteractiveDialogue v-else-if="!state.readingExplanation" :story="props.pattern.story"
      @complete="completeDialogue" />
    <div v-else class="explanation">
      {{ props.pattern.explanation }}
    </div>
  </div>
</template>

<style scoped>
.dialogueContainer {
  margin-top: 2rem;
  padding-bottom: calc(50vh - 61px);
}

.prompt {
  width: fit-content;
  margin: auto;
}
</style>
