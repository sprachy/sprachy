<script lang="ts">
  import _, { flatten, shuffle } from "lodash"
  import ExerciseView from "$lib/ExerciseView.svelte"
  import sprachy from "$lib/sprachy"
  import type { Pattern } from "./Pattern"
  import LevelReport from "$lib/LevelReport.svelte"
  import successImg from "$lib/img/success.webp"

  const spa = sprachy.expectSPA()
  const { user, speech } = spa

  export let patterns: Pattern[]

  let startedReview = false
  let completedReview = false
  let showNext = false
  let experienceByPatternId: { [id: string]: number } = {}

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

    if (!(review.pattern.id in experienceByPatternId)) {
      experienceByPatternId[review.pattern.id] = 0
    }
    experienceByPatternId[review.pattern.id] += 200

    if (reviewIndex >= reviews.length - 1) {
      completedReview = true
    } else {
      reviewIndex += 1
    }
  }

  async function finish() {
    spa.recalcCurrentLearning()
  }
</script>

<svelte:head>
  {#each reviews as review}
    {#if "image" in review.exercise}
      <link rel="preload" as="image" href={review.exercise.image} />
    {/if}
  {/each}
</svelte:head>

<div class="practice">
  {#if !startedReview}
    <h2>Review session</h2>
    <button class="btn btn-primary" on:click={() => (startedReview = true)}
      >Start review</button
    >
  {:else if completedReview}
    <div class="complete">
      <div>
        <img src={successImg} alt="Happy squirrel" />
      </div>
      <div>
        <h4>Review complete!</h4>
        <LevelReport
          {experienceByPatternId}
          on:animEnd={() => (showNext = true)}
        />
        <button
          class="btn btn-primary mt-2"
          on:click={finish}
          style:opacity={showNext ? 1 : 0}>Continue</button
        >
      </div>
    </div>
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

  .complete {
    margin: auto;
    width: 100%;
    max-width: 900px;
    display: flex;
    gap: 2rem;
  }

  .complete > div:last-child {
    flex-grow: 1;
  }
</style>
