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
import type { Pattern } from "../common/api"
import marked from "marked"
import FillblankCard from "./FillblankCard.vue"

@Component({
  components: {
    FillblankCard,
  },
})
export default class LearnPage extends Vue {
  state: "nonetolearn" | "initial" | "quiz" | "complete" = "initial"
  pattern: Pattern | null = null
  exerciseIndex: number = 0

  async created() {
    this.$debug.LearnPage = this
    this.pattern = await this.$api.getNextPattern()
    if (this.pattern === null) {
      this.state = "nonetolearn"
    }
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
