<script setup lang="ts">
onMounted(() => progressStore.updateCurrentLearnable())

const { currentLearnable } = toRefs(progressStore)

function nextLearnable() {
  progressStore.updateCurrentLearnable()
}

function finishExplanation() {
  if (progressStore.currentLearnable?.type !== 'pattern') return
  progressStore.currentLearnable.readExplanation = true
}

</script>

<template>
  <LearnSidebar />
  <main class="learnable" v-if="currentLearnable">
    <LearnModeDialogue v-if="currentLearnable.type === 'dialogue'" :pattern="currentLearnable.pattern"
      @complete="nextLearnable" />
    <LearnModeExplanation v-else-if="currentLearnable.type === 'pattern' && !currentLearnable.readExplanation"
      @complete="finishExplanation" />
    <ReviewSession v-else-if="currentLearnable.type === 'review'" :patterns="currentLearnable.patterns" />
    <LearnModeExercises v-else :pattern="currentLearnable.pattern" @complete="nextLearnable" />
  </main>
</template>

<style scoped>
.learnable {
  padding-top: 5rem;
  padding-left: 300px;
  height: 100%;
}
</style>
