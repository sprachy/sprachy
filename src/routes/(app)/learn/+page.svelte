<script lang="ts">
  import sprachy from "$lib/sprachy"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LearnModeExplanation from "$lib/LearnModeExplanation.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import AppPage from "$lib/AppPage.svelte"
  import LearnSidebar from "$lib/LearnSidebar.svelte"
  import ReviewSession from "$lib/ReviewSession.svelte"

  const spa = sprachy.expectSPA()
  const { learning, nextThingToLearn } = spa

  if (!$learning) {
    $learning = $nextThingToLearn
  }

  $: if ($learning) {
    window.scrollTo(0, 0)
  }

  function nextLearning() {
    spa.recalcCurrentLearning()
  }

  function finishExplanation() {
    if ($learning?.type !== "pattern") return
    $learning.readExplanation = true
  }
</script>

<PageStyling fixedHeader />

<AppPage title="Sprachy">
  {#if $learning}
    <LearnSidebar />
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
          <LearnModeExplanation on:complete={finishExplanation} />
        {:else if $learning.type === "review"}
          <ReviewSession patterns={$learning.patterns} />
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
    height: 100%;
  }
</style>
