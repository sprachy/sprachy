<script lang="ts">
  import _ from "lodash"
  import type { Exercise } from "$lib/Pattern"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import type { PatternAndProgress } from "$lib/client/SprachyUserSPA"
  import sprachy from "$lib/sprachy"

  const spa = sprachy.expectSPA()
  const {
    api,
    learnedPatterns,
    patternsReadyToLevel,
    allReviews,
    reviewsForLeveling,
  } = spa

  let freePractice: boolean = false
  const noPatternsYet = $learnedPatterns.length === 0
  let patternsToLevel = $patternsReadyToLevel

  type Review = Exercise & {
    pattern: PatternAndProgress
  }

  let reviews: Review[] = []
  if (patternsToLevel.length === 0) {
    freePractice = true
    reviews = _.sampleSize($allReviews, 10)
  } else {
    // reviews = $allReviews.filter((r) => r.message.includes("nie wieder"))
    reviews = _.shuffle($reviewsForLeveling)
  }

  let reviewIndex: number = 0
  let completed = false

  $: review = reviews[reviewIndex]

  async function levelUpPattern(pattern: PatternAndProgress) {
    const progressItem = await api.completeLevel(
      pattern!.id,
      pattern.progress.srsLevel + 1
    )
    if (progressItem) {
      spa.receiveProgressItem(progressItem)
      patternsToLevel = patternsToLevel.filter(
        (p) => p.id !== progressItem.patternId
      )
    }
  }

  function nextReview() {
    const completedReview = review
    if (completedReview) {
      const remainingReviews = reviews.slice(reviewIndex + 1)
      if (
        !remainingReviews.some((r) => r.pattern === completedReview.pattern)
      ) {
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
    {#if noPatternsYet}
      <p>You haven't learned any patterns to practice yet!</p>
    {:else}
      <p>
        Missing exercise definitions for {patternsToLevel
          .map((p) => p.title)
          .join(", ")}! Let's add those~
      </p>
    {/if}
  {:else if completed}
    <p class="text-center">All reviews completed!</p>
  {:else}
    {#if freePractice}
      <header class="practice-header">
        <h3>Free Practice</h3>
        <p class="text-secondary">
          There aren't any patterns ready to level yet. If you like, you can
          practice random exercises here.
        </p>
      </header>
    {:else}
      <header class="practice-header">
        <h3>Level Practice</h3>
        <p class="text-secondary">
          Complete these exercises to level up {patternsToLevel.length} pattern{patternsToLevel.length >
          1
            ? "s"
            : ""}.
        </p>
      </header>
    {/if}
    <div class="exercises">
      {#key reviewIndex}
        <StoryLineFillblank
          line={review}
          on:correct={nextReview}
          pattern={review.pattern}
        />
      {/key}
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
