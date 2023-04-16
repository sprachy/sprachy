<script setup lang="ts">
import { translations } from "~/lib/translations"

const props = defineProps<{
  original: string
  inline: boolean
}>()

const m = props.original.match(/^(.+?) \((.+?)\)$/)
const deutsch = m ? m[1] : props.original
const translation = m ? m[2] : translations[props.original]
</script>

<template>
  <div :class="{ cell: true, inline }">
    <template v-if="inline">
      <span class="original">{{ deutsch }}</span>
      <span v-if="translation" class="translation">({{ translation }})</span>
    </template>
    <template v-else>
      <div class="original">{{ deutsch }}</div>
      <div class="translation">{{ translation }}</div>
    </template>
  </div>
</template>

<style scoped>
.cell.inline .original {
  font-style: italic;
}

.cell:not(.inline) .original {
  font-size: 105%;
}

.cell:not(.inline) .translation {
  color: #777;
  font-size: 90%;
}
</style>
