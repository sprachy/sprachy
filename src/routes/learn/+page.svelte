<script lang="ts">
  import sprachy from "$lib/sprachy"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LevelBar from "$lib/LevelBar.svelte"
  import PageStyling from "$lib/PageStyling.svelte"

  let dialogue: LearnModeDialogue | null = null

  const spa = sprachy.expectSPA()
  const { nextThingToLearn, totalExperience } = spa

  let learning = $nextThingToLearn

  function continueStory() {
    if (dialogue) {
      dialogue.continueStory()
    }
  }

  async function finishDialogue() {
    const { pattern } = $nextThingToLearn!
    if (pattern.progress.experience < 1000) {
      await spa.gainPatternExperience(pattern.id, 1000)
    }
    nextLearning()
  }

  function nextLearning() {
    learning = $nextThingToLearn
  }
</script>

<PageStyling fixedHeader />

<main>
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
          bind:this={dialogue}
          on:complete={finishDialogue}
        />
      {:else}
        <LearnModeExercises
          pattern={learning.pattern}
          on:complete={nextLearning}
        />
      {/if}
    {:else}
      <p>You've already learned everything?! Congrats!</p>
    {/if}
  </div>
</main>

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
