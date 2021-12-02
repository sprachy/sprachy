<template>
  <span>
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component
export default class HoverTranslate extends Vue {
  get template() {
    let text = this.$slots.default![0]!.text!

    return text
  }
}
</script>

<style lang="sass" scoped>
::v-deep .dline:not(:first-child)
  border-top: 0px
</style>
