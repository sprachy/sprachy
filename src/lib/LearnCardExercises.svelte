<script lang="ts">
  import _ from "lodash"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import type { Review } from "$lib/client/SprachyUserSPA"
  import sprachy from "$lib/sprachy"
  import { fly } from "svelte/transition"
  import type { Exercise } from "./Pattern"

  const spa = sprachy.expectSPA()
  const { api, user, speech } = spa

  export let exercises: Review[]
  export let expMultiplier: number = 1.0
  export let returnUrl: string = "/home"

  let experienceByPatternId: Record<string, number> = {}
  let exerciseIndex: number = 0

  let completing = false
  let completed = false

  $: exercise = exercises[exerciseIndex]!

  $: audioPromises = $user?.enableSpeechSynthesis
    ? exercises.map((ex) => {
        return speech.synthesizeLine(ex)
      })
    : []

  async function nextExercise() {
    if (completing || completed) return

    // Completed an exercise, gain experience
    const expGained = 200 * expMultiplier
    spa.gainPatternExperience(exercise.pattern.id, expGained)

    if (exerciseIndex >= exercises.length - 1) {
      // Completed all reviews
      completing = true
      try {
        for (const exercise of exercises) {
          if (!(exercise.pattern.id in experienceByPatternId)) {
            experienceByPatternId[exercise.pattern.id] = 0
          }
          experienceByPatternId[exercise.pattern.id] += 200 * expMultiplier
        }
        const progressItems = await api.gainExperience(experienceByPatternId)
        for (const item of progressItems) {
          spa.receiveProgressItem(item)
        }
      } finally {
        completing = false
        completed = true
      }
    } else {
      exerciseIndex += 1
    }
  }
</script>

<div class="practice">
  <div class="exercises">
    {#key exerciseIndex}
      <StoryLineFillblank
        line={exercise}
        audioPromise={audioPromises[exerciseIndex]}
        on:correct={nextExercise}
        pattern={exercise.pattern}
      />
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
