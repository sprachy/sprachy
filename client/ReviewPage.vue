<template>
  <site-layout>
    <template v-if="reviews !== null">
      <template v-if="reviews.length === 0">
        <p>No reviews yet!</p>
      </template>
      <template v-else>
        <fillblank-card :exercise="exercise" />
      </template>
    </template>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Review } from "../common/api"
import FillblankCard from "./FillblankCard.vue"

@Component({
  components: {
    FillblankCard,
  },
})
export default class ReviewPage extends Vue {
  reviews: Review[] | null = null
  exerciseIndex: number = 0

  async created() {
    const { reviews } = await this.$api.getReviews()
    console.log(reviews)
    this.reviews = reviews
  }

  get exercises() {
    return _.flatten(this.reviews!.map((r) => r.pattern.exercises))
  }

  get exercise() {
    return this.exercises[this.exerciseIndex]
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
