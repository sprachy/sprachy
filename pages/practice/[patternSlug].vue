<script setup lang="ts">
import successImg from "~/assets/success.webp"
import { parsePattern } from '~/lib/Pattern'
import { preloadExerciseAssets } from '~/lib/preloading'

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
  exerciseIndex: 0,
  showNext: false,

  get exercises() {
    return pattern.value?.exercises || []
  },

  get exercise() {
    return this.exercises[state.exerciseIndex]
  },

  get experienceByPatternId() {
    return {
      [pattern.value!.id]: 100
    }
  }
})

watchEffect(() => {
  if (process.browser && pattern.value)
    preloadExerciseAssets(pattern.value.exercises)
})

function nextExercise() {
  state.exerciseIndex++
}
</script>

<template>
  <main class="container" v-if="pattern">
    <h1 class="text-center">Practice: {{ pattern.title }}</h1>
    <ExerciseView :key="state.exerciseIndex" @correct="nextExercise" v-if="state.exercise" :exercise="state.exercise"
      :pattern="pattern" />
    <div v-else class="complete">
      <div>
        <img :src="successImg" alt="Happy squirrel" />
      </div>
      <div>
        <h4>Exercises complete!</h4>
        <ClientOnly>
          <LevelReport :experienceByPatternId="state.experienceByPatternId" @animEnd="state.showNext = true" />
        </ClientOnly>
        <NuxtLink class="btn btn-primary mt-2" :class="{ opacity: state.showNext ? 1 : 0 }"
          :href="progressStore.nextHref">
          Continue
        </NuxtLink>
      </div>
    </div>
  </main>
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