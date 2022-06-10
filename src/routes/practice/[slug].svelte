<script context="module" lang="ts">
  import { sprachdex } from "$lib/sprachdex"
  import type { Load } from "@sveltejs/kit"

  export const load: Load<{ slug: string }> = async ({ params }) => {
    const pattern = sprachdex.patternsIncludingDrafts.find(
      (p) => p.slug === params.slug
    )

    if (!pattern) {
      return { status: 404 }
    }

    return {
      status: 200,
      props: {
        patternId: pattern.id,
      },
    }
  }
</script>

<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import sprachy from "$lib/sprachy"

  export let patternId: string

  const spa = sprachy.expectSPA()
  const { patternsAndProgress } = spa

  $: pattern = $patternsAndProgress.find((p) => p.id === patternId)!
  $: remainingExercises = pattern.exercises
  $: currentExercise = remainingExercises[0]
  $: completed = remainingExercises.length === 0

  function nextExercise() {
    remainingExercises = remainingExercises.slice(1)
    // const completedReview = review
    // if (completedReview) {
    //   const remainingReviews = reviews.slice(reviewIndex + 1)
    //   if (
    //     !remainingReviews.some((r) => r.pattern === completedReview.pattern)
    //   ) {
    //     // Completed reviews for a pattern, level it up
    //     levelUpPattern(completedReview.pattern)
    //   }
    // }
    // if (reviewIndex >= reviews.length - 1) {
    //   // Completed all reviews
    //   completed = true
    // } else {
    //   reviewIndex += 1
    // }
  }
</script>

<SiteLayout>
  {#if completed}
    <p class="text-center">All reviews completed!</p>
  {:else if !currentExercise}
    <p>
      Missing exercise definitions for {pattern.slug}! Let's add those~
    </p>
  {:else}
    <header class="practice-header">
      <h3>Level Practice</h3>
      <p class="text-secondary">Complete these exercises to level up pattern</p>
    </header>
    <div class="exercises">
      {#key pattern.exercises.indexOf(currentExercise)}
        <StoryLineFillblank
          line={currentExercise}
          on:correct={nextExercise}
          {pattern}
        />
      {/key}
    </div>
  {/if}
</SiteLayout>

<style>
  .practice-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .exercises {
    margin: auto;
    max-width: 600px;
  }
</style>
