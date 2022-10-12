<script lang="ts">
  import sprachy from "$lib/sprachy"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LearnModeExplanation from "$lib/LearnModeExplanation.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import AppPage from "$lib/AppPage.svelte"
  import LearnSidebar from "$lib/LearnSidebar.svelte"
  import type { Learning } from "$lib/client/SprachyUserSPA"
  import ReviewSession from "$lib/ReviewSession.svelte"

  const spa = sprachy.expectSPA()
  const { learning, nextThingToLearn } = spa

  if (!$learning) {
    $learning = $nextThingToLearn
  }

  function nextLearning() {
    $learning = $nextThingToLearn as Learning | undefined
    window.scrollTo(0, 0)
  }
</script>

<PageStyling fixedHeader />

<AppPage title="Sprachy">
  {#if $learning}
    <LearnSidebar learning={$learning} />
  {/if}
  <div class="learnable">
    {#if $learning}
      {#key $learning.why}
        {#if $learning.type === "dialogue"}
          <LearnModeDialogue
            pattern={$learning.pattern}
            on:complete={nextLearning}
          />
        {:else if $learning.type === "pattern" && !$learning.readExplanation}
          <LearnModeExplanation />
        {:else if $learning.type === "review"}
          <ReviewSession
            patterns={$learning.patterns}
            on:complete={nextLearning}
          />
        {:else}
          <LearnModeExercises
            pattern={$learning.pattern}
            on:complete={nextLearning}
          />
        {/if}
      {/key}
    {:else}
      <p>You've already learned everything?! Congrats!</p>
    {/if}
  </div>
</AppPage>

<style>
  .learnable {
    padding-top: 5rem;
    padding-left: 300px;
  }
</style>
