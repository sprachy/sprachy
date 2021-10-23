<template>
  <site-layout>
    <template v-if="loaded">
      <template v-if="reviews.length === 0">
        <p>No reviews yet!</p>
      </template>
      <template v-else-if="!completed">
        <fillblank-card :exercise="exercise" @answer="onAnswer" />
      </template>
      <template v-else> Reviews completed! </template>
    </template>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Exercise, Pattern, Review } from "../common/api"
import FillblankCard from "./FillblankCard.vue"

type ExerciseItem = Exercise & {
  pattern: Pattern
}

@Component({
  components: {
    FillblankCard,
  },
})
export default class ReviewPage extends Vue {
  loaded: boolean = false
  reviews: Review[] = []
  exerciseIndex: number = 0

  async created() {
    const { reviews } = await this.$api.getReviews()
    this.reviews = reviews
    this.loaded = true
  }

  onAnswer(correct: boolean) {
    this.$backgroundApi.recordReview(this.exercise.pattern.id, correct)
    if (this.exerciseIndex < this.exercises.length - 1) {
      this.exerciseIndex += 1
    }
  }

  get exercises(): ExerciseItem[] {
    const exercises = []
    for (const review of this.reviews!) {
      for (const exercise of review.pattern.exercises) {
        exercises.push(Object.assign({}, exercise, { pattern: review.pattern }))
      }
    }
    return exercises
  }

  get exercise() {
    return this.exercises[this.exerciseIndex]!
  }

  get completed() {
    return this.exerciseIndex === this.exercises.length - 1
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
