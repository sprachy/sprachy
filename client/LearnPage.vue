<template>
  <site-layout>
    <div v-if="pattern">
      <template v-if="state === 'initial'">
        <h1>{{ pattern.title }}</h1>
        <div v-html="htmlExplain"/>
        <button class="btn btn-primary" @click="quiz = true">Continue</button>
      </template>
      <template v-else-if="state === 'quiz'">
        <fillblank-card :exercise="exercise" @correct="nextExercise"/>
      </template>
      <template v-else-if="state === 'complete'">

      </template>
    </div>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern } from "../common/api"
import marked from 'marked'
import FillblankCard from './FillblankCard.vue'

@Component({
  components: {
    FillblankCard
  },
})
export default class LearnPage extends Vue {
  state: 'initial'|'quiz'|'complete' = 'initial'
  pattern: Pattern|null = null
  exerciseIndex: number = 0

  async created() {
    this.pattern = await this.$api.getNextPattern()
  }

  get exercise() {
    return this.pattern!.exercises[this.exerciseIndex]
  }

  async nextExercise() {
    if (this.exerciseIndex+1 >= this.pattern!.exercises.length) {
      this.$api.setLearned(this.pattern!.id)
      this.state = 'complete'
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
