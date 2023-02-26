<script setup lang="ts">
import type { Pattern } from "~/lib/Pattern"
import Sprachdown from "~/components/Sprachdown.vue"

defineProps<{ pattern: Pattern }>()
</script>

<template>
  <article class="explanation">
    <Sprachdown :source="pattern.explanation" />
  </article>
</template>

<style scoped>
.explanation {
  font-size: 17px;
  line-height: 28px;
}

.explanation :deep(strong) {
  color: rgb(28, 176, 246);
}

.explanation :deep(.btn) {
  margin-right: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .explanation :deep(table) {
    font-size: 90%;
  }
}
</style>
