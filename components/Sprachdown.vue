<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
// import SprachdownHTML from "./SprachdownHTML.svelte"

const props = defineProps<{
  source: string
  inline?: boolean
}>()
  // const parsedSource = source.replace(/=[^=\n]+=/, (substring) => {
  //   const highlight = substring.slice(1, -1)
  //   return `<InlineTranslation original="${highlight}"/>`
  // })
</script>

<template>
  <div :class="{ markdown: true, 'markdown-inline': props.inline }">
    <Markdown :source="props.source" />
  </div>
</template>

<style>
.markdown-inline {
  display: inline;
}

.markdown-inline :global(p) {
  margin: 0;
  display: inline;
}
</style>
