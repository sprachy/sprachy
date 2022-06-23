<script lang="ts">
  import _ from "lodash"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import type { Review } from "$lib/client/SprachyUserSPA"
  import successImg from "$lib/img/success.webp"
  import LevelReport from "$lib/LevelReport.svelte"

  export let exercises: Review[]

  let exerciseIndex: number = 0
  let completed = false

  $: exercise = exercises[exerciseIndex]!

  function nextExercise() {
    if (exerciseIndex >= exercises.length - 1) {
      // Completed all reviews
      completed = true
    } else {
      exerciseIndex += 1
    }
  }
</script>

{#if completed}
  <div class="complete">
    <div>
      <img src={successImg} alt="Happy squirrel" />
    </div>
    <div>
      <h4>Introduction complete</h4>
      <LevelReport
        gains={[{ pattern, progress, experience: 1000 }]}
        on:animEnd={() => (showNext = true)}
      />
      <!-- <a
        sveltekit:prefetch
        style:opacity={showNext ? 1 : 0}
        class="btn btn-success mt-2"
        href={`/practice/${pattern.slug}`}
        >Continue to practice
      </a> -->
    </div>
  </div>
{:else}
  <!-- <header class="practice-header">
      <h3>Level Practice</h3>
      <p class="text-secondary">
        Complete these exercises to level up {patternsToLevel.length} pattern{patternsToLevel.length >
        1
          ? "s"
          : ""}.
      </p>
    </header> -->
  <div class="exercises">
    {#key exerciseIndex}
      <StoryLineFillblank
        line={exercise}
        on:correct={nextExercise}
        pattern={exercise.pattern}
      />
    {/key}
  </div>
{/if}

<style>
  .practice-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .exercises {
    margin: auto;
    max-width: 600px;
  }

  .complete {
    margin: auto;
    margin-top: 50vh;
    transform: translateY(-50%);
    width: 100%;
    max-width: 800px;
    display: flex;
  }

  .complete > div:last-child {
    margin-left: 2rem;
    flex-grow: 1;
  }

  .complete .btn {
    transition: opacity 0.5s;
  }
</style>
