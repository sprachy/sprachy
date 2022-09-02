<script lang="ts">
  import sprachy from "$lib/sprachy"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LearnModeExplanation from "$lib/LearnModeExplanation.svelte"
  import LevelBar from "$lib/LevelBar.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import AppPage from "$lib/AppPage.svelte"

  const spa = sprachy.expectSPA()
  const { nextThingToLearn, totalExperience } = spa

  let learning = $nextThingToLearn

  let readExplanation = false
  $: if (learning) {
    readExplanation = false
  }

  $: showExplanation =
    !readExplanation &&
    learning?.type === "exercises" &&
    learning?.pattern.progress.level < 2

  function nextLearning() {
    learning = $nextThingToLearn as Learnable | undefined
  }
</script>

<PageStyling fixedHeader />

<AppPage title="Sprachy">
  <div class="sidebar">
    <div class="overview">
      {#if learning}
        <div>{learning.why}</div>
      {/if}
      <LevelBar experience={$totalExperience} />
      {#if learning?.type === "dialogue"}
        <small class="text-secondary"
          >&lt;&lt; Press Enter to continue dialogue &gt;&gt;</small
        >
        <!-- <button class="btn btn-success btn-lg" on:click={continueStory}>
          {#if readyForNext}
            Next
          {:else}
            Continue
          {/if}
        </button> -->
      {/if}
    </div>
  </div>
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
  .sidebar {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    padding-top: 5rem;
    border-right: 1px solid #ccc;
    z-index: 1;
    background-color: white;
    width: 300px;
  }

  .learnable {
    padding-top: 5rem;
    padding-left: 300px;
  }
</style>
