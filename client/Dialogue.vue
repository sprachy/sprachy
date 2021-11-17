<template>
  <div class="dialogue">
    <img class="character" :src="icon" />
    {{ original }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
// @ts-ignore
import squirrel from "./img/squirrel.png"

@Component
export default class Dialogue extends Vue {
  get text() {
    return (this.$slots.default![0]?.text || "").trim()
  }

  get icon() {
    return squirrel
  }

  get original() {
    return this.text.split("\n")[0]
  }

  get translation() {
    return this.text.split("\n")[1]
  }
}
</script>

<style lang="sass">
.dialogue
  padding: 1rem
  border: 1px solid #ccc

  .character
    width: 50px
    height: 50px
</style>
