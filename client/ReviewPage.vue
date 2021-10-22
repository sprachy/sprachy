<template>
  <site-layout>
    <h1>Review</h1>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Review } from "../common/api"

@Component({
  components: {},
})
export default class ReviewPage extends Vue {
  reviews: Review[]
  async created() {
    const { reviews } = await this.$api.getReviews()
    this.reviews = reviews
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
