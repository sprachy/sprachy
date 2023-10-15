<script setup lang="ts">
import PatternItem from "./PatternItem.vue"

const { data: patterns } = await useAsyncData('patternIndex', () => fetchPatternIndex())
</script>

<template>
  <div class="pattern-index">
    <ul>
      <PatternItem v-for="pattern in patterns" :pattern="pattern" />
    </ul>
  </div>
</template>

<style scoped>
.pattern-index ul {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
}

.pattern-index ul :deep(li) {
  flex-basis: 33%;
}

@media only screen and (max-width: 1200px) {
  .pattern-index ul :deep(li) {
    flex-basis: 50%;
  }
}

@media only screen and (max-width: 768px) {
  .pattern-index ul :deep(li) {
    flex-basis: 100%;
  }
}
</style>
