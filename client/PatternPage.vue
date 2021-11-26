<template>
  <site-layout>
    <div v-if="pattern">
      <h1>{{ pattern.title }}</h1>
      <sprachdown :content="pattern.explanation" />
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
import FillblankCard from "./FillblankCard.vue"
import { sprachdex } from "../common/sprachdex"
import { NotFoundError } from "./globalErrorHandling"

@Component<LearnPage>({
  components: {
    FillblankCard,
  },
  metaInfo() {
    return {
      title: this.pattern?.title ? this.pattern?.title + " - Sprachy" : null,
    }
  },
})
export default class LearnPage extends Vue {
  @Prop({ type: String, required: true }) slug!: string

  get pattern() {
    const pattern = sprachdex.allPatterns.find((p) => p.slug === this.slug)

    if (!pattern) {
      throw new NotFoundError()
    }

    return pattern
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
