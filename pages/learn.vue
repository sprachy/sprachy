<script setup lang="ts">
definePageMeta({
  layout: false
})

onMounted(() => {
  progressStore.updateCurrentLearnable()
})

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
  <NuxtLayout name="default" fixedHeader>
    <LearnSidebar />
    <main class="learnable">
      <template v-if="currentLearnable">
        <LearnModeDialogue v-if="currentLearnable.type === 'dialogue'" :pattern="currentLearnable.pattern"
          @complete="nextLearnable" />
        <LearnModeExplanation v-else-if="currentLearnable.type === 'pattern' && !currentLearnable.readExplanation"
          :learnable="currentLearnable" @complete="finishExplanation" />
        <LearnModeExercises v-else-if="currentLearnable.type === 'pattern' && currentLearnable.readExplanation"
          :learnable="currentLearnable" @complete="nextLearnable" />
        <LearnModeReview v-else-if="currentLearnable.type === 'review'" :learnable="currentLearnable"
          @complete="nextLearnable" />
      </template>
      <template v-else>
        <p>You've finished learning everything we have!</p>
      </template>
    </main>
  </NuxtLayout>
</template>

<style scoped>
.learnable {
  padding-top: 5rem;
  padding-left: 300px;
  height: 100%;
}
</style>
