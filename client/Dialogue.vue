<template>
  <div class="dialogue">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component
export default class Dialogue extends Vue {}
</script>

<style lang="sass" scoped>
::v-deep .dline:not(:first-child)
  border-top: 0px
</style>
