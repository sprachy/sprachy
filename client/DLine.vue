<template>
  <div class="dline">
    <img class="avatar" :src="icon" />
    <div class="quote">
      <div>{{ original }}</div>
      <div class="translation">{{ translation }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
// @ts-ignore
import lukas from "./img/lukas.png"
// @ts-ignore
import anna from "./img/anna.png"
// @ts-ignore
import squirrel from "./img/squirrel.png"

@Component
export default class DLine extends Vue {
  @Prop({ type: String, default: "squirrel" }) by!: string

  get text() {
    return (this.$slots.default![0]?.text || "").trim()
  }

  get icon() {
    return { lukas, anna, squirrel }[this.by]
  }

  get original() {
    return this.text.split("\n")[0]
  }

  get translation() {
    return this.text.split("\n")[1]
  }
}
</script>

<style lang="sass" scoped>
.dline
  display: flex
  margin: 24px 0

  .avatar
    width: 50px
    height: 50px
    padding: 3px
    margin-right: 12px

  .quote::before
    border-bottom: 12px solid transparent
    border-right: 12px solid #dedede
    border-top-left-radius: 50%
    content: ""
    left: -14px
    position: absolute
    top: -2px

  .quote::after
    border-bottom: 12px solid transparent
    border-right: 12px solid #fff
    content: ""
    left: -9px
    position: absolute
    top: 0

  .quote
    position: relative
    background-color: #fff
    border: 2px solid #dedede
    border-radius: 14px
    border-top-left-radius: 0
    max-width: 80%
    padding: 10px 12px

  .translation
    color: #777
    font-size: 0.9rem
</style>
