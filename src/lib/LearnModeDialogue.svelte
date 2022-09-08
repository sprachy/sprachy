<script lang="ts">
  import InteractiveDialogue from "./InteractiveDialogue.svelte"
  import type { Pattern } from "$lib/Pattern"
  import { createEventDispatcher } from "svelte"
  import sprachy from "./sprachy"

  const spa = sprachy.expectSPA()
  const { progressByPatternId } = spa

  export let pattern: Pattern
  let promptToBegin: boolean = true
  let readingExplanation: boolean = false

  const dispatch = createEventDispatcher()

  $: progress = $progressByPatternId[pattern.id]!

  async function completeDialogue() {
    if (progress.experience < 1000) {
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
    <InteractiveDialogue story={pattern.story} on:complete={completeDialogue} />
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
