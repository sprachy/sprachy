<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import sprachy from "$lib/sprachy"
  import PracticeSession from "$lib/client/PracticeSession.svelte"

  const spa = sprachy.expectSPA()
  const { allAvailableExercises } = spa

  $: exercises = _.sampleSize($allAvailableExercises, 5)
</script>

<SiteLayout>
  {#if !exercises.length}
    You haven't learned any patterns to practice yet!
  {:else}
    <div class="practice-header">
      <h2>Practice Roulette</h2>
      <div class="bonus">+20% EXP</div>
    </div>
    <PracticeSession {exercises} expMultiplier={1.2} />
  {/if}
</SiteLayout>

<style>
  .practice-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .bonus {
    font-size: 0.9rem;
    color: var(--blue-highlight);
  }
</style>
