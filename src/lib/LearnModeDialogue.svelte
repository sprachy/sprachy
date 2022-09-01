<script lang="ts">
  import InteractiveDialogue from "./InteractiveDialogue.svelte"
  import type { PatternAndProgress } from "./client/SprachyUserSPA"
  import { createEventDispatcher } from "svelte"

  export let pattern: PatternAndProgress
  let dialogue: InteractiveDialogue | null = null

  const dispatch = createEventDispatcher()

  export function continueStory() {
    if (dialogue) {
      dialogue.continueStory()
    }
  }

  async function onCompleteStory() {
    dispatch("complete")
  }
</script>

<div class="dialogueContainer">
  {#key pattern.id}
    <InteractiveDialogue
      story={pattern.story}
      bind:this={dialogue}
      on:complete={onCompleteStory}
    />
  {/key}
</div>

<style>
  .dialogueContainer {
    margin-top: 2rem;
    padding-bottom: calc(50vh - 61px);
  }
</style>
