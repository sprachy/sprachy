<script setup lang="ts">
// import SprachdownHTML from "./SprachdownHTML.svelte"
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

const props = defineProps<{
  source: string
  inline?: boolean
}>()

const state = defineState({
  get renderedMarkdown() {
    if (props.inline) {
      return md.renderInline(props.source)
    } else {
      return md.render(props.source)
    }
  }
})


  // const parsedSource = source.replace(/=[^=\n]+=/, (substring) => {
  //   const highlight = substring.slice(1, -1)
  //   return `<InlineTranslation original="${highlight}"/>`
  // })
</script>

<template>
  <span class="markdown" v-if="props.inline" v-html="state.renderedMarkdown" />
  <div class="markdown" v-else v-html="state.renderedMarkdown" />
</template>