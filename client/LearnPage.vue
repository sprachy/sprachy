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
    this.$debug.LearnPage = this
    const pattern = await this.$api.getNextPattern()
    if (pattern === null) {
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
