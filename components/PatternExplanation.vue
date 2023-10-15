<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types"

defineProps<{ pattern: ParsedContent }>()
</script>

<template>
  <ContentRenderer :value="pattern" class="explanation" />
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
