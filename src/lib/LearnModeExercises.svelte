<script lang="ts">
  import _ from "lodash"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import sprachy from "$lib/sprachy"
  import { createEventDispatcher } from "svelte"
  import type { Pattern } from "./Pattern"

  const spa = sprachy.expectSPA()
  const { user, speech, progressByPatternId } = spa

  export let pattern: Pattern
  export let expMultiplier: number = 1.0
  const dispatch = createEventDispatcher()

  $: progress = $progressByPatternId[pattern.id]!

  let exerciseIndex = 0
  $: exercises = Array.from(pattern.exercises)
  $: if (exercises) {
    exerciseIndex = 0
  }
  $: exercise = exercises[exerciseIndex]!

  $: audioPromises = $user?.enableSpeechSynthesis
    ? exercises.map((ex) => {
        return speech.synthesizeLine(ex)
      })
    : []

  async function nextExercise() {
    if (exerciseIndex >= exercises.length - 1) {
      exerciseIndex = 0
    } else {
      // Completed an exercise, gain experience
      const expGained = 200 * expMultiplier
      spa.gainPatternExperience(pattern.id, expGained)
      exerciseIndex += 1
    }

    if (progress.level >= 2) {
      dispatch("complete")
    }
  }
</script>

<div class="practice">
  <div class="exercises">
    <StoryLineFillblank
      line={exercise}
      audioPromise={audioPromises[exercises.indexOf(exercise)]}
      on:correct={nextExercise}
      {pattern}
    />
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
