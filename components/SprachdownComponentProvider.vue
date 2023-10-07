<script setup lang="ts">
import LTable from './LTable.vue'
import DialogueExample from './DialogueExample.vue'
import Tip from './Tip.vue'

const props = defineProps<{
  renderedMarkdown: string
}>()

const root = defineComponent({
  components: { LTable, DialogueExample, Tip },
  template: props.renderedMarkdown,
})
</script>

<template>
  <root />
</template>