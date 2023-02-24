<script setup lang="ts">
import LTableTranslation from "./LTableTranslation.vue"
import Sprachdown from "../Sprachdown.vue"

const props = defineProps<{
  header?: string,
  translate?: boolean,
  inlines?: boolean
}>()

// Hacky! https://stackoverflow.com/a/71112772/16811479
const slots = useSlots() as any
const text = slots.default!()[0].children.default!()[0].children as string

const state = defineState({
  get headerRow() {
    return props.header?.split(" / ")
  },

  get lines() {
    return text.trim().split("\n")
  },

  get rows() {
    return this.lines.map(l => l.split(" / "))
  }
})
</script>

<template>
  <table class="mt-2 ltable table table-bordered">
    <thead v-if="state.headerRow">
      <tr>
        <th v-for="d in state.headerRow">
          {{ d }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in state.rows">
        <td v-for="d in row">
          <template v-if="d !== '_'">
            <LTableTranslation v-if="translate" :original="d" :inline="!!inlines" />
            <Sprachdown v-else :source="d" />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.ltable {
  text-align: center;
}

.ltable th {
  border-bottom: none;
}

.ltable :global(p) {
  margin: 0;
}
</style>
