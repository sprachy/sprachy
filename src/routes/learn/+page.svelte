<script lang="ts">
  import sprachy from "$lib/sprachy"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LearnModeExplanation from "$lib/LearnModeExplanation.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import AppPage from "$lib/AppPage.svelte"
  import LearnSidebar from "$lib/LearnSidebar.svelte"
  import type { Learnable } from "$lib/client/SprachyUserSPA"

  const spa = sprachy.expectSPA()
  const { nextThingToLearn, progressByPatternId } = spa

  let learning = $nextThingToLearn

  let readExplanation = false
  $: if (learning) {
    readExplanation = false
  }

  $: progress = learning ? $progressByPatternId[learning.pattern.id] : undefined

  $: showExplanation =
    !readExplanation &&
    learning?.type === "exercises" &&
    (!progress || progress.level < 2)

  function nextLearning() {
    learning = $nextThingToLearn as Learnable | undefined
    window.scrollTo(0, 0)
  }
</script>

<PageStyling fixedHeader />

<AppPage title="Sprachy">
  {#if learning}
    <LearnSidebar {learning} />
  {/if}
  <div class="learnable">
    {#if learning}
      {#if learning.type === "dialogue"}
        <LearnModeDialogue
          pattern={learning.pattern}
          on:complete={nextLearning}
        />
      {:else if learning.type === "exercises"}
        {#if showExplanation}
          <LearnModeExplanation
            pattern={learning.pattern}
            on:complete={() => (readExplanation = true)}
          />
        {:else}
          <LearnModeExercises
            pattern={learning.pattern}
            on:complete={nextLearning}
          />
        {/if}
      {/if}
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
