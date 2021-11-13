<template>
  <site-layout>
    <div v-if="pattern">
      <template v-if="!complete">
        <fillblank-card :exercise="exercise" @correct="nextExercise" />
      </template>
      <template v-else>
        <p>
          Nice work! This pattern will become available for review in 4 hours.
        </p>
      </template>
    </div>
  </site-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern } from "../common/api"
import marked from "marked"
import FillblankCard from "./FillblankCard.vue"

@Component({
  components: {
    FillblankCard,
  },
})
export default class LearnPage extends Vue {
  state: "initial" | "quiz" | "complete" = "initial"
  @Prop({ type: String, required: true }) slug!: string
  pattern: Pattern | null = null
  exerciseIndex: number = 0

  activated() {
    this.state = "initial"
  }

  async created() {
    this.$debug.patternPage = this
  }

  @Watch("slug", { immediate: true })
  async loadPattern() {
    this.pattern = await this.$api.getPattern(this.slug)
  }

  get exercise() {
    return this.pattern!.exercises[this.exerciseIndex]
  }

  async nextExercise() {
    if (this.exerciseIndex + 1 >= this.pattern!.exercises.length) {
      this.$api.recordReview(this.pattern!.id, true)
      this.state = "complete"
    } else {
      this.exerciseIndex += 1
    }
  }

  get htmlExplain() {
    return marked(this.pattern!.explanation)
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
