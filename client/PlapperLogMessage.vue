<template>
  <plapper-message :from="from">
    {{ parts.original }}
    <template v-slot:translation>{{ parts.translation }}</template>
  </plapper-message>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component
export default class PlapperLogMessage extends Vue {
  @Prop({ type: String, required: true }) from!: string

  get parts() {
    const text = this.$slots.default![0]!.text!
    const lines = text.trim().split("\n")
    const original = lines[0]!.trim()
    const translation = lines[1]!.trim()
    return {
      original,
      translation,
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
