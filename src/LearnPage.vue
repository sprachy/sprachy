<template>
  <site-layout>
    <div v-if="pattern">
      <template v-if="!quiz">
        <h1>{{ pattern.title }}</h1>
        <p>{{ pattern.explanation }}</p>
        <button class="btn btn-primary" @click="quiz = true">Continue</button>
      </template>
      <template v-if="quiz">
      </template>
    </div>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import { Pattern } from "./api"

@Component({
  components: {},
})
export default class LearnPage extends Vue {
  pattern: Pattern|null = null
  quiz: boolean = false

  async created() {
    this.pattern = await this.$api.getPattern()
    console.log(this.pattern)
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
