<script lang="ts">
  import _, { flatten, shuffle } from "lodash"
  import ExerciseView from "$lib/ExerciseView.svelte"
  import sprachy from "$lib/sprachy"
  import { createEventDispatcher } from "svelte"
  import type { Pattern } from "./Pattern"

  const spa = sprachy.expectSPA()
  const { user, speech } = spa

  export let patterns: Pattern[]

  let startedReview = false
  const dispatch = createEventDispatcher()

  const reviews = shuffle(
    flatten(
      patterns.map((p) =>
        p.exercises.map((ex) => ({ pattern: p, exercise: ex }))
      )
    )
  )

  let reviewIndex = 0
  $: review = reviews[reviewIndex]!

  $: if ($user.enableSpeechSynthesis) {
    for (const review of reviews) {
      speech.preloadExercise(review.exercise)
    }
  }

  async function nextExercise() {
    // Completed an exercise, gain experience
    spa.gainPatternExperience(review.pattern.id, 200)

    if (reviewIndex >= reviews.length - 1) {
      dispatch("complete")
    } else {
      reviewIndex += 1
    }
  }
</script>

<div class="practice">
  {#if !startedReview}
    <h2>Review session</h2>
    <button class="btn btn-primary" on:click={() => (startedReview = true)}
      >Start review</button
    >
  {:else}
    <div class="exercises">
      {#key reviewIndex}
        <ExerciseView
          exercise={review.exercise}
          on:correct={nextExercise}
          pattern={review.pattern}
        />
      {/key}
    </div>
  {/if}
</div>

<style>
  .practice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem 0;
  }
</style>
