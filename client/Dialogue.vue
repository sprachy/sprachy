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
export default class Dialogue extends Vue {}
</script>

<style lang="sass">
</style>
