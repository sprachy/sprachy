<template>
  <div class="mastery">
    <div className="d-flex">
      <div>
        Mastery level {{ progress.srsLevel }}/9
        <!-- {learny.masteryLevel === 9 && <FontAwesomeIcon icon={faStar} />} -->
      </div>
    </div>

    <div class="outer">
      <div className="inner" :style="{ width: `${masteryPercent}%` }" />
    </div>

    <div>
      <template v-if="progress.nextReviewAt <= Date.now()">
        <span>Review available now</span>
      </template>
      <template v-else-if="progress.nextReviewAt > Date.now()">
        <span>Reviewing: <ReactTimeago date="{nextReview.when}" /></span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { ProgressWithNextReview } from "../common/api"

@Component({
  components: {},
})
export default class MasteryProgressBar extends Vue {
  @Prop({ type: Object, required: true }) progress!: ProgressWithNextReview

  get masteryPercent() {
    return (this.progress.srsLevel / 9) * 100
  }
}
</script>

<style lang="sass">
.mastery
  display: flex
  flex-direction: column
  color: #666
  font-size: 0.8rem
  padding-right: 1rem

.outer, .inner
  border-radius: 10px

.outer
  width: 250px
  height: 10px
  background: rgba(33,36,44,0.08)

.inner
  height: 100%
  background-color: #9059ff
  transition: background-color .3s ease

.outer:not(.mastered) .inner
  border-top-right-radius: 0
  border-bottom-right-radius: 0
</style>
