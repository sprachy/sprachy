<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import PracticeSession from "$lib/client/PracticeSession.svelte"

  const spa = sprachy.expectSPA()
  const { allAvailableExercises, restBonusAvailable } = spa

  $: exercises = _.sampleSize($allAvailableExercises, 5)

  $: expMultiplier = 1.2 + (restBonusAvailable ? 0.5 : 0)
</script>

{#if !exercises.length}
  You haven't learned any patterns to practice yet!
{:else}
  <!-- <div class="practice-header">
    <h2>Practice Roulette</h2>
    <div class="bonus">Roulette bonus: +20% EXP</div>
    {#if restBonusAvailable}
      <div class="bonus">Rest bonus: +50% EXP</div>
    {/if}
  </div> -->
  <PracticeSession {exercises} {expMultiplier} />
{/if}
