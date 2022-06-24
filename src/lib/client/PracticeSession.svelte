<script lang="ts">
  import _ from "lodash"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import type { Review } from "$lib/client/SprachyUserSPA"
  import successImg from "$lib/img/success.webp"
  import sprachy from "$lib/sprachy"
  import LevelReport from "$lib/LevelReport.svelte"

  const spa = sprachy.expectSPA()
  const { api } = spa

  export let exercises: Review[]

  let experienceByPatternId: Record<string, number> = {}
  let exerciseIndex: number = 0

  let completing = false
  let completed = false

  $: exercise = exercises[exerciseIndex]!

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
          experienceByPatternId[exercise.pattern.id] += 200
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
      <LevelReport {experienceByPatternId} />
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
