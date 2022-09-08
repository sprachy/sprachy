<script lang="ts">
  import InteractiveDialogue from "./InteractiveDialogue.svelte"
  import type { PatternAndProgress } from "./client/SprachyUserSPA"
  import { createEventDispatcher } from "svelte"
  import sprachy from "./sprachy"

  const spa = sprachy.expectSPA()

  export let pattern: PatternAndProgress
  let promptToBegin: boolean = true
  let readingExplanation: boolean = false

  const dispatch = createEventDispatcher()

  async function completeDialogue() {
    if (pattern.progress.experience < 1000) {
      await spa.gainPatternExperience(pattern.id, 1000)
    }
    dispatch("complete")
  }
</script>

<div class="dialogueContainer">
  {#if promptToBegin}
    <div class="prompt">
      <h1>{pattern.title}</h1>
      <button class="btn btn-success" on:click={() => (promptToBegin = false)}>
        Start dialogue
      </button>
    </div>
  {:else if !readingExplanation}
    {#key pattern.id}
      <InteractiveDialogue
        story={pattern.story}
        on:complete={completeDialogue}
      />
    {/key}
  {:else}
    <div class="explanation">
      {pattern.explanation}
    </div>
  {/if}
</div>

<style>
  .dialogueContainer {
    margin-top: 2rem;
    padding-bottom: calc(50vh - 61px);
  }

  .prompt {
    width: fit-content;
    margin: auto;
  }
</style>
