<template>
  <site-layout>
    <div v-if="pattern">
      <h1>{{ pattern.title }}</h1>
      <runtime-template-compiler :template="template" />
      <b-btn variant="primary" :to="`/pattern/${pattern.slug}/practice`">
        Practice
      </b-btn>
    </div>
  </site-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern } from "../common/api"
import marked from "marked"
import FillblankCard from "./FillblankCard.vue"
// @ts-ignore
import { RuntimeTemplateCompiler } from "vue-runtime-template-compiler"

@Component<LearnPage>({
  components: {
    FillblankCard,
    RuntimeTemplateCompiler,
  },
  metaInfo() {
    return {
      title: this.pattern?.title ? this.pattern?.title + " - Sprachy" : null,
    }
  },
})
export default class LearnPage extends Vue {
  @Prop({ type: String, required: true }) slug!: string
  pattern: Pattern | null = null
  exerciseIndex: number = 0

  async created() {
    this.$debug.patternPage = this
  }

  @Watch("slug", { immediate: true })
  async loadPattern() {
    this.pattern = await this.$api.getPattern(this.slug)
  }

  get template() {
    return `<div>` + marked(this.pattern!.explanation) + `</div>`
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
