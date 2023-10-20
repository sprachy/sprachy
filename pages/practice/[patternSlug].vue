<script setup lang="ts">
import { parsePattern } from '~/lib/Pattern'

const { patternSlug } = useRoute().params

const { data: patternData, error } = await useAsyncData(`pattern/${patternSlug}`,
  () => queryContent(`/${patternSlug}`).findOne()
)

const pattern = computed(() => patternData.value ? parsePattern(patternData.value) : null)

if (error.value) {
  throw createError(error.value)
}

const state = defineState({
  exerciseIndex: 0,

  get exercises() {
    return pattern.value?.exercises || []
  },

  get exercise() {
    return this.exercises[state.exerciseIndex]
  }
})

watchEffect(() => {
  if (speech.enabled) {
    state.exercises.map(ex => {
      speech.preloadExercise(ex)
    })
  }
})

function nextExercise() {
  state.exerciseIndex++
}
</script>


<template>
  <Head>
    <template v-for="exercise in state.exercises">
      <link v-if="exercise.image" rel="preload" as="image" :href="imageLibrary[exercise.image]" />
    </template>
  </Head>
  <main class="container" v-if="pattern">
    <h1>{{ pattern.title }}</h1>
    <ExerciseView @correct="nextExercise" v-if="state.exercise" :exercise="state.exercise" :pattern="pattern" />
    <p v-else>
      All exercises complete!
    </p>
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>