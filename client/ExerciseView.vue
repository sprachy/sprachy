<template>
  <b-card class="exerciseCard">
    <div>
      <span>{{ parts.before }}</span>
      <span class="cloze" :style="{ minWidth: clozeWidth+'px' }">{{ attempt }}&nbsp;</span>
      <span>{{ parts.after }}</span>
    </div>
    <div v-html="translationHtml"/>
    <input type="text" v-model="attempt"/>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Exercise } from "../common/api"

@Component({
  components: {},
})
export default class ExerciseView extends Vue {
  @Prop({ type: Object, required: true }) exercise!: Exercise
  attempt: string = ""

  get parts() {
    const [before, altstr, after] = this.exercise.content.split(/\[(.+?)\]/) 
    return {
      before: before||"",
      alternatives: (altstr||"").split('|'),
      after: after||""
    }
  }

  get clozeWidth() {
    const longestAnswer = _.sortBy(this.parts.alternatives, s => -s.length)[0]
    return longestAnswer ? longestAnswer.length*16 : 0
  }

  get translationHtml() {
    return this.exercise.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `<strong>${highlight}</strong>`
    })
  }

}
</script>

<style lang="sass" scoped>
.exerciseCard
  text-align: center

strong
  color: #64b5f6

.cloze
  border-bottom: 0.25rem solid #5f6368
  padding: 0 1.25rem
  display: inline-block
</style>
