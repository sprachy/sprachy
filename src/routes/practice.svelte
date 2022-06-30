<script lang="ts">
  import _ from "lodash"
  import type { Exercise } from "$lib/Pattern"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import type { PatternAndProgress } from "$lib/client/SprachyUserSPA"
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
    <PracticeSession {exercises} />
  {/if}
</SiteLayout>

<style>
  .practice-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .exercises {
    margin: auto;
    max-width: 600px;
  }
</style>
