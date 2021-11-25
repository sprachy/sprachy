<template>
  <site-layout>
    <main class="container">
      Sprachy is a thingy for learning German with patterns!
      <ul>
        <li
          class="pattern"
          v-for="pattern in patternProgress"
          :key="pattern.id"
        >
          <router-link :to="`/pattern/${pattern.slug}`">
            <div class="icon" :style="{ backgroundColor: '#1ba156' }">
              <font-awesome-icon :icon="pattern.icon" />
            </div>
            <div>
              <h6 :style="{ color: '#1ba156' }">
                {{ pattern.title }}
                <template v-if="pattern.progress">
                  <span v-for="i in pattern.progress.srsLevel" :key="i"
                    >⭐</span
                  >
                </template>
              </h6>
              <div class="shortdesc">
                {{ pattern.shortdesc }}
              </div>
              <div class="timetolevel" v-if="pattern.progress">
                Can be leveled in
                <timeago :datetime="pattern.progress.nextReviewAt" />
              </div>
            </div>
          </router-link>
          <!-- <div class="ml-auto" v-if="pattern.progress">
            <mastery-progress-bar :progress="pattern.progress" />
          </div> -->
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

<style lang="sass" scoped>
ul
  padding: 0

li.pattern:not(:first-child)
  margin-top: 1rem

li.pattern
  list-style-type: none

  > a
    display: flex
    align-items: center
    padding: 1rem
    color: inherit

  .icon
    padding: 0.75rem
    margin-right: 1rem

  .icon svg
    color: white
    width: 32px
    height: 32px

  h6
    font-size: 1.1rem
    margin-bottom: 0.1rem

  .shortdesc
    margin-bottom: 0.1rem

  .timetolevel
    font-style: italic
    color: #666
    font-size: 0.9rem
</style>
