<script lang="ts">
  import _ from "lodash"
  import type { Review } from "$lib/client/SprachyUserSPA"
  import successImg from "$lib/img/success.webp"
  import sprachy from "$lib/sprachy"
  import LevelReport from "$lib/LevelReport.svelte"
  import { fly } from "svelte/transition"
  import FocusHeader from "$lib/FocusHeader.svelte"
  import ExerciseView from "$lib/ExerciseView.svelte"

  const spa = sprachy.expectSPA()
  const { api, user, speech } = spa

  export let exercises: Review[]
  export let expMultiplier: number = 1.0
  export let returnUrl: string = "/learn"

  let experienceByPatternId: Record<string, number> = {}
  let exerciseIndex: number = 0

  let completing = false
  let completed = false
  let showNext = false

  $: exercise = exercises[exerciseIndex]!

  $: audioPromises = $user?.enableSpeechSynthesis
    ? exercises.map((ex) => {
        return speech.synthesizeLine(ex)
      })
    : []

  async function nextExercise() {
    if (completing || completed) return

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

{#if completed}
  <div class="complete">
    <div>
      <img src={successImg} alt="Happy squirrel" />
    </div>
    <div>
      <h4>Exercises complete!</h4>
      <LevelReport
        {experienceByPatternId}
        on:animEnd={() => (showNext = true)}
      />
      <a
        sveltekit:prefetch
        style:opacity={showNext ? 1 : 0}
        class="btn btn-success mt-2"
        href={returnUrl}
        >Continue
      </a>
    </div>
  </div>
{:else}
  <FocusHeader closeUrl={returnUrl}>
    <h1>Practicing</h1>
  </FocusHeader>
  <div class="practice">
    <div class="exercises" in:fly={{ y: 20, duration: 500 }}>
      {#key exerciseIndex}
        <ExerciseView
          {exercise}
          audioPromise={audioPromises[exerciseIndex]}
          on:correct={nextExercise}
          pattern={exercise.pattern}
        />
      {/key}
    </div>
    <footer />
  </div>
{/if}

<style>
  .practice {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  h1 {
    color: #ccc;
    font-size: 2rem;
    margin: 0;
    position: relative;
    top: -2px;
  }

  footer {
    height: 8rem;
    width: 100%;
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
