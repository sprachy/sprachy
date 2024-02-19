<script setup lang="ts">
import { parsePattern } from '~/lib/Pattern'

definePageMeta({
  layout: 'toc'
})

const { patternSlug } = useRoute().params

const { data: patternData, error } = await useAsyncData(`pattern/${patternSlug}`,
  () => queryContent(`/${patternSlug}`).findOne()
)

const pattern = computed(() => patternData.value ? parsePattern(patternData.value as any) : null)

if (error.value) {
  throw createError(error.value)
}

const state = defineState({
  promptToBegin: true,
})

async function completeDialogue() {
  const pattern = progressStore.progressablePatterns.find(p => p.slug === patternSlug)

  if (pattern && pattern.progress.experience < 1000) {
    await progressStore.gainPatternExperience(pattern.id, 1000)
  }

  navigateTo(progressStore.nextHref)

  // // Give the experience bar a moment to animate
  // setTimeout(() => {

  // }, 1000)
}
</script>

<template>
  <div class="dialogueContainer" v-if="pattern">
    <div v-if="state.promptToBegin" class="d-flex flex-column align-items-center">
      <h1>Dialogue: {{ pattern.dialogue.title }}</h1>
      <button class="btn btn-primary" @click="state.promptToBegin = false">Start</button>
    </div>
    <InteractiveSequence v-else :lines="pattern.dialogue.lines" @complete="completeDialogue" />
  </div>
</template>

<style scoped>
main.container {
  padding-top: 1rem;
  max-width: 800px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>