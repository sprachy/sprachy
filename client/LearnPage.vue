<template>
  <site-layout>
    <template v-if="state === 'nonetolearn'">
      <p>You've learned all available patterns, congrats!</p>
    </template>
    <div v-else-if="pattern">
      <template v-if="state === 'initial'">
        <h1>{{ pattern.title }}</h1>
        <div v-html="htmlExplain" />
        <button class="btn btn-primary" @click="state = 'quiz'">
          Continue
        </button>
      </template>
      <template v-else-if="state === 'quiz'">
        <fillblank-card :exercise="exercise" @correct="nextExercise" />
      </template>
      <template v-else-if="state === 'complete'">
        <p>
          Nice work! This pattern will become available for review in 4 hours.
        </p>
      </template>
    </div>
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
    }
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
