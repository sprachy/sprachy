<script lang="ts">
  import _ from "lodash"
  import ExerciseView from "$lib/ExerciseView.svelte"
  import sprachy from "$lib/sprachy"
  import { createEventDispatcher } from "svelte"
  import type { Pattern } from "./Pattern"

  const spa = sprachy.expectSPA()
  const { user, speech, progressByPatternId } = spa

  export let pattern: Pattern
  export let expMultiplier: number = 1.0
  const dispatch = createEventDispatcher()

  $: progress = $progressByPatternId[pattern.id]!
  let startLevel: number
  $: if (progress && startLevel == null) {
    startLevel = progress.level
  }

  let exerciseIndex = 0
  $: exercises = Array.from(pattern.exercises)

  $: if (exercises) {
    exerciseIndex = 0
  }
  $: exercise = exercises[exerciseIndex]!

  $: if ($user.enableSpeechSynthesis) {
    for (const ex of exercises) {
      speech.preloadExercise(ex)
    }
  }

  async function nextExercise() {
    // Completed an exercise, gain experience
    const expGained = 200 * expMultiplier
    spa.gainPatternExperience(pattern.id, expGained)

    if (progress.level > startLevel) {
      dispatch("complete")
    } else if (exerciseIndex >= exercises.length - 1) {
      exerciseIndex = 0
    } else {
      exerciseIndex += 1
    }
  }
</script>

<svelte:head>
  {#each exercises as exercise}
    {#if "image" in exercise}
      <link rel="preload" as="image" href={exercise.image} />
    {/if}
  {/each}
</svelte:head>

<div class="practice">
  <div class="exercises">
    {#key pattern.id + "-" + exerciseIndex}
      <ExerciseView {exercise} on:correct={nextExercise} {pattern} />
    {/key}
  </div>
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
