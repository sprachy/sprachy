<template>
  <site-layout>
    <div v-if="pattern">
      <template v-if="!complete">
        <fillblank-card :exercise="exercise" @answer="onAnswer" />
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
import { NotFoundError } from "./globalErrorHandling"

@Component({
  components: {
    FillblankCard,
  },
})
export default class PracticePage extends Vue {
  @Prop({ type: String, required: true }) slug!: string
  pattern: Pattern | null = null
  exerciseIndex: number = 0
  complete: boolean = false
  mistakes: number = 0

  exercises: { content: string }[] = []

  activated() {
    if (this.pattern && !this.$router.lastRouteChangeWasPopState) {
      this.pattern = null
      this.loadPattern()
    }
  }

  @Watch("slug", { immediate: true })
  loadPattern() {
    const pattern = this.$app.patternsWithProgress.find(
      (p) => p.slug === this.slug
    )
    if (!pattern) {
      throw new NotFoundError()
    }
    this.pattern = pattern
    this.exercises = pattern.exercises
    this.exerciseIndex = 0
    this.complete = false
    this.mistakes = 0
  }

  get exercise() {
    return this.pattern!.exercises[this.exerciseIndex]!
  }

  async onAnswer(correct: boolean) {
    if (!correct) {
      this.mistakes += 1
      this.exercises.push(this.exercise)
      this.exercises.shift()
      return
    }

    if (this.exerciseIndex + 1 >= this.pattern!.exercises.length) {
      const progressItem = await this.$api.recordReview(
        this.pattern!.id,
        this.mistakes === 0
      )
      if (progressItem) {
        this.$app.receiveProgressItem(progressItem)
      }
      this.complete = true
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
