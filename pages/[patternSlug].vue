
<script setup lang="ts">
const { patternSlug } = useRoute().params

const { data: pattern, error } = await useAsyncData(`pattern/${patternSlug}`,
  () => sprachdex.fetchPatternBySlug(patternSlug as string)
)

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
