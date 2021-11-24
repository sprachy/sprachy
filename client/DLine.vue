<template>
  <div class="dline">
    <img class="avatar" :src="icon" />
    <div class="quote">
      <template v-if="exerciseContext">
        <span>{{ parts.before }}</span>
        <span class="fillblank" :style="{ minWidth: clozeWidth + 'px' }"
          >&#8203;{{ exerciseContext.attempt }}&#8203;</span
        >
        <span>{{ parts.after }}</span>
      </template>
      <template v-else>
        <div v-html="original" />
      </template>
      <div class="translation" v-html="translation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
// @ts-ignore
import lukas from "./img/lukas.png"
// @ts-ignore
import anna from "./img/anna.png"
// @ts-ignore
import squirrel from "./img/squirrel.png"
import marked from "marked"
import type { ExerciseContext } from "./types"

@Component
export default class DLine extends Vue {
  @Prop({ type: String, default: "squirrel" }) by!: string
  @Inject("exerciseContext") exerciseContext?: ExerciseContext

  created() {
    this.$debug.dline = this
  }

  get parts() {
    const text = this.$slots.default![0]!.text!
    const lines = text.trim().split("\n")
    const original = lines[0]!
    const translation = lines[1]!

    const [before, altstr, after] = original!.split(/\[(.+?)\]/)
    return {
      original,
      translation,
      before: before || "",
      alternatives: (altstr || "").split("|"),
      after: after || "",
    }
  }

  @Watch("parts", { immediate: true })
  updateContext() {
    if (this.exerciseContext) {
      this.exerciseContext.alternatives = this.parts.alternatives
    }
  }

  get clozeWidth() {
    const longestAnswer = _.sortBy(this.parts.alternatives, (s) => -s.length)[0]
    return longestAnswer ? longestAnswer.length * 9 : 0
  }

  get original() {
    return this.parts.original
  }

  get translation() {
    return this.parts.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `<strong>${highlight}</strong>`
    })
  }

  get icon() {
    return { lukas, anna, squirrel }[this.by]
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

  ::v-deep p
    margin: 0

  span.fillblank
    color: #64b5f6
    border-bottom: 2px solid #5f6368
    min-width: 20px
    display: inline-block
    text-align: center
    line-height: 1.5rem
</style>
