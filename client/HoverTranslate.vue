<template>
  <span v-b-popover.hover.top="translation" :class="{ 'text-danger': error }">
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
import { translations } from "../common/translations"

@Component
export default class HoverTranslate extends Vue {
  get translation() {
    const text = this.$slots.default![0]!.text!
    return translations[text]
  }

  get error() {
    return !this.translation
  }
}
</script>

<style lang="sass" scoped>
span
  border-bottom: 1px dotted #000
</style>
