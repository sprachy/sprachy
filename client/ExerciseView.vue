<template>
  <div>
    <div v-html="exerciseHtml"/>
  </div>
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

  get exerciseHtml() {
    return this.exercise.content.replace(/\[.+?\]/, (substring) => {
      const alternatives = substring.slice(1, -1).split("|")
      return alternatives[0] ? '_'.repeat(alternatives[0].length) : ""
    })
  }

}
</script>

<style lang="sass">
</style>
