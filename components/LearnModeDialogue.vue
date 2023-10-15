<script lang="ts" setup>
const props = defineProps<{
  pattern: PatternNavigationItem
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const { data: patternData } = await useAsyncData(`pattern/${props.pattern.id}`,
  () => fetchPatternById(props.pattern.id)
)

const state = defineState({
  promptToBegin: true,

  get progress() {
    return progressStore.progressablePatternById[props.pattern.id].progress
  }
})

async function completeDialogue() {
  if (state.progress.experience < 1000) {
    await progressStore.gainPatternExperience(props.pattern.id, 1000)
  }
  emit("complete")
}
</script>

<template>
  <div class="dialogueContainer" v-if="patternData">
    <div class="prompt" v-if="state.promptToBegin">
      <h1>{{ patternData.title }}</h1>
      <button class="btn btn-success" @click="state.promptToBegin = false">
        Start dialogue
      </button>
    </div>
    <InteractiveDialogue v-else :dialogue="patternData.dialogue" @complete="completeDialogue" />
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
