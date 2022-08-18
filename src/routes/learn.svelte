<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import LearnModeDialogue from "$lib/LearnModeDialogue.svelte"
  import LearnModeExercises from "$lib/LearnModeExercises.svelte"
  import LevelBar from "$lib/LevelBar.svelte"

  let dialogue: LearnModeDialogue | null = null

  const { nextThingToLearn, totalExperience } = sprachy.expectSPA()

  let learning = $nextThingToLearn

  function continueStory() {
    if (dialogue) {
      dialogue.continueStory()
    }
  }

  function nextLearning() {
    learning = $nextThingToLearn
  }
</script>

<SiteLayout noContainer fixedHeader>
  <div class="sidebar">
    <div class="overview">
      {#if learning}
        <div>{learning.why}</div>
      {/if}
      <LevelBar experience={$totalExperience} />
      {#if learning?.type === "dialogue"}
        <button class="btn btn-success btn-lg" on:click={continueStory}
          >Continue</button
        >
      {/if}
    </div>
  </div>
  <div class="learnable">
    {#if learning}
      {#if learning.type === "dialogue"}
        <LearnModeDialogue
          pattern={learning.pattern}
          bind:this={dialogue}
          on:complete={nextLearning}
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
</SiteLayout>

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
    padding-left: 300px;
  }
</style>
