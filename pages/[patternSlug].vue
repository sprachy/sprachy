
<script setup lang="ts">
const { patternSlug } = useRoute().params
console.log(patternSlug)
const { data: pattern } = await useAsyncData(`pattern/${patternSlug}`, () => queryContent(patternSlug).findOne())
</script>


<template>
  <main class="container" v-if="pattern">
    <h1>{{ pattern.title }}</h1>
    <PatternExplanation :pattern="pattern" />
    <NuxtLink class="btn btn-sprachy" :href="`/practice/${pattern.slug}`">
      Practice
    </NuxtLink>
  </main>
</template>

<style scoped>
main.container {
  max-width: 800px;
}
</style>
