<script lang="ts" setup>
const props = defineProps<{
  learnable: Required<LearnableDialogue>
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  promptToBegin: true
})

async function completeDialogue() {
  if (props.learnable.pattern.progress.experience < 1000) {
    await progressStore.gainPatternExperience(props.learnable.pattern.id, 1000)
  }

  // Give the experience bar a moment to animate
  setTimeout(() => {
    emit("complete")
  }, 1000)
}
</script>

<template>
  <div class="dialogueContainer">
    <InteractiveSequence :lines="learnable.data.dialogue.lines" @complete="completeDialogue" />
  </div>
</template>

<style scoped>
.dialogueContainer {
  margin-top: 2rem;
  padding-bottom: calc(50vh - 61px);
}

:deep(img) {
  max-height: 300px;
}

:deep(figure) {
  justify-content: flex-start;
}
</style>
