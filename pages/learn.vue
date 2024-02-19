<script setup lang="ts">
definePageMeta({
  layout: 'toc'
})

onMounted(() => {
  progressStore.updateCurrentLearnable()
  if (progressStore.currentLearnable)
    navigateTo(progressStore.currentLearnable.href)
})
</script>

<template>
  <!-- <main class="learnable">
      <template v-if="loadedLearnable">
        <LearnModeDialogue v-if="loadedLearnable.type === 'dialogue'" :learnable="loadedLearnable"
          @complete="nextLearnable" />
        <LearnModeExplanation v-else-if="loadedLearnable.type === 'pattern' && !loadedLearnable.readExplanation"
          :learnable="loadedLearnable" @complete="finishExplanation" />
        <LearnModeExercises v-else-if="loadedLearnable.type === 'pattern' && loadedLearnable.readExplanation"
          :learnable="loadedLearnable" @complete="nextLearnable" />
        <LearnModeReview v-else-if="loadedLearnable.type === 'review'" :learnable="loadedLearnable"
          @complete="nextLearnable" />
      </template>
      <template v-else-if="!progressStore.nextThingToLearn">
        <p>You've finished learning everything we have!</p>
      </template>
      <template v-else>
        <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
          <LoadingIndicator />
        </div>
      </template>
    </main> -->
</template>

<style scoped></style>
