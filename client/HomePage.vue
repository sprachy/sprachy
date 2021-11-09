<template>
  <site-layout>
    <main class="container">
      Sprachy is a thingy for learning German with patterns!
      <ul>
        <li v-for="pattern in patternProgress" :key="pattern.id">
          {{ pattern.title }}
          <div class="ml-auto" v-if="pattern.progress">
            <mastery-progress-bar :progress="pattern.progress" />
          </div>
        </li>
      </ul>
    </main>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern, ProgressWithNextReview } from "../common/api"
import MasteryProgressBar from "./MasteryProgressBar.vue"

@Component({
  components: {
    MasteryProgressBar,
  },
})
export default class HomePage extends Vue {
  loaded: boolean = false
  data: { patterns: Pattern[]; progress: ProgressWithNextReview[] } = {
    patterns: [],
    progress: [],
  }

  async created() {
    this.data = await this.$api.getProgressOverview()
    this.loaded = true
  }

  get progressByPatternId() {
    return _.keyBy(this.data.progress, (p) => p.patternId)
  }

  get patternProgress() {
    return this.data.patterns.map((p) => {
      return Object.assign({}, p, {
        progress: this.progressByPatternId[p.id],
      })
    })
  }
}
</script>

<style lang="sass">
</style>
