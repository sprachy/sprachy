<script lang="ts">
  import _ from "lodash"
  import type { Exercise } from "../common/Pattern"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"
  import StoryLineFillblank from "./StoryLineFillblank.svelte"
  import type { PatternAndProgress } from "./UserApp"

  type Review = Exercise & {
    pattern: PatternAndProgress
  }

  let reviews: Review[] = []
  for (const pattern of sprachy.app.patternsReadyToLevel) {
    for (const exercise of pattern.exercises) {
      reviews.push(Object.assign({}, exercise, { pattern }))
      reviews = _.shuffle(reviews)
    }
    // const exercise = _.sample(pattern.exercises)
  }

  let reviewIndex: number = 0
  let completed = false

  $: review = reviews[reviewIndex]

  async function levelUpPattern(pattern: PatternAndProgress) {
    const progressItem = await sprachy.api.completeLevel(pattern!.id, pattern.progress.srsLevel + 1)
    if (progressItem) {
      sprachy.app.receiveProgressItem(progressItem)
    }
  }

  function nextReview() {
    const completedReview = review
    if (completedReview) {
      const remainingReviews = reviews.slice(reviewIndex + 1)
      if (!remainingReviews.some((r) => r.pattern === completedReview.pattern)) {
        // Completed reviews for a pattern, level it up
        levelUpPattern(completedReview.pattern)
      }
    }

    if (reviewIndex >= reviews.length - 1) {
      // Completed all reviews
      completed = true
    } else {
      reviewIndex += 1
    }
  }
</script>

<SiteLayout>
  {#if !review}
    <p>You haven't learned any patterns to practice yet!</p>
  {:else if completed}
    <p>All reviews completed!</p>
  {:else}
    <header class="practice-header">
      <!-- <h3>Free Practice</h3>
      <p class="text-secondary">
        There aren't any patterns ready to level yet. If you like, you can practice random exercises
        here.
      </p> -->
    </header>
    <div class="exercises">
      <StoryLineFillblank line={review} on:correct={nextReview} />
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.practice-header
  margin-bottom: 2rem
  text-align: center

.exercises
  margin: auto
  max-width: 600px
</style>
