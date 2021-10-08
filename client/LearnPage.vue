<template>
  <site-layout>
    <div v-if="pattern">
      <template v-if="!quiz">
        <h1>{{ pattern.title }}</h1>
        <div v-html="htmlExplain"/>
        <button class="btn btn-primary" @click="quiz = true">Continue</button>
      </template>
      <template v-if="quiz">
        <exercise-view :exercise="exercise"/>
      </template>
    </div>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern } from "../common/api"
import marked from 'marked'
import ExerciseView from './ExerciseView.vue'

@Component({
  components: {
    ExerciseView
  },
})
export default class LearnPage extends Vue {
  pattern: Pattern|null = null
  quiz: boolean = true

  async created() {
    this.pattern = await this.$api.getNextPattern()
  }

  get exercise() {
    return this.pattern!.exercises[0]
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
