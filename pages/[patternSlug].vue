
<script setup lang="ts">
import { parsePattern } from '~/lib/Pattern'

const { patternSlug } = useRoute().params

const { data: patternData, error } = await useAsyncData(`pattern/${patternSlug}`,
  () => queryContent(`/${patternSlug}`).findOne()
)

const pattern = computed(() => patternData.value ? parsePattern(patternData.value as any) : null)

if (error.value) {
  throw createError(error.value)
}
</script>

<template>
  <main class="container" v-if="pattern">
    <article>
      <h1>{{ pattern.title }}</h1>
      <PatternExplanation :pattern="pattern" />
      <NuxtLink class="btn btn-sprachy" :href="`/practice/${pattern.slug}`">
        Practice
      </NuxtLink>
    </article>
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>
