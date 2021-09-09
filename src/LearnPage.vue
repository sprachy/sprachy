<template>
  <site-layout>
    <div v-if="pattern">
      <h1>{{ pattern.title }}</h1>
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
