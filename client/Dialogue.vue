<template>
  <div>
    <strong>
      <slot />
    </strong>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"

@Component
export default class Dialogue extends Vue {
  created() {
    console.log(this.$slots.default![0]!.text)
  }
}
</script>

<style lang="sass">
</style>
