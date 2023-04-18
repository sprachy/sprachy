<script setup lang="ts">
// import SprachdownHTML from "./SprachdownHTML.svelte"
import MarkdownIt from 'markdown-it'
import { componentPlugin } from '@mdit-vue/plugin-component'
import LTable from './LTable.vue'

const md = MarkdownIt({ html: true }).use(componentPlugin, {
  // options
})

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

const root = defineComponent({
  components: { LTable },
  template: state.renderedMarkdown,
})

  // const parsedSource = source.replace(/=[^=\n]+=/, (substring) => {
  //   const highlight = substring.slice(1, -1)
  //   return `<InlineTranslation original="${highlight}"/>`
  // })
</script>

<template>
  <root />
</template>