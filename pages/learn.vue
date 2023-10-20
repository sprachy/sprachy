<script setup lang="ts">
definePageMeta({
  layout: false
})

onMounted(() => {
  progressStore.updateCurrentLearnable()
})

const { currentLearnable } = toRefs(progressStore)

const loadedLearnable = ref(null as Required<Learnable> | null)

// Load any needed data for the current learnable when we get a new one
watch(currentLearnable, async (learnable) => {
  if (!learnable) return
  loadedLearnable.value = null

  if (learnable.type === 'review') {
    learnable.data = await sprachdex.fetchPatterns({ id: { $in: learnable.patterns.map(p => p.id) } })
  } else {
    learnable.data = await sprachdex.fetchPatternById(learnable.pattern.id)
  }

  loadedLearnable.value = learnable as Required<Learnable>
})

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
