<template>
  <site-layout>
    <template v-if="noNewPatterns">
      <p>You've learned all available patterns, congrats!</p>
    </template>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component
export default class LearnPage extends Vue {
  noNewPatterns: boolean = false

  async created() {
    const pattern = this.$app.nextPatternToLearn
    if (!pattern) {
      this.noNewPatterns = true
      return
    }

    this.$router.navigateReplace(`/pattern/${pattern.slug}`)
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
