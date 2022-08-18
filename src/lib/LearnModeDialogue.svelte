<script lang="ts">
  import InteractiveDialogue from "./InteractiveDialogue.svelte"
  import type { PatternAndProgress } from "./client/SprachyUserSPA"
  import sprachy from "./sprachy"
  import LevelReport from "./LevelReport.svelte"
  import successImg from "$lib/img/success.webp"
  import { createEventDispatcher } from "svelte"

  export let pattern: PatternAndProgress
  let dialogue: InteractiveDialogue | null = null
  let complete = false

  const spa = sprachy.expectSPA()

  const dispatch = createEventDispatcher()

  export function continueStory() {
    if (dialogue) {
      dialogue.continueStory()
    }
  }

  async function onCompleteStory() {
    if (pattern.progress.experience < 1000) {
      await spa.gainPatternExperience(pattern.id, 1000)
    }
    complete = true
    dispatch("complete")
  }
</script>

{#if complete}
  <div class="complete">
    <div>
      <div>
        <img src={successImg} alt="Happy squirrel" />
      </div>
      <div>
        <h4>Dialogue complete</h4>
        <LevelReport experienceByPatternId={{ [pattern.id]: 1000 }} />
      </div>
    </div>
  </div>
{:else}
  <div class="dialogueContainer">
    <InteractiveDialogue
      story={pattern.story}
      bind:this={dialogue}
      on:complete={onCompleteStory}
    />
  </div>
{/if}

<style>
  .dialogueContainer {
    margin-top: 2rem;
    padding-bottom: calc(50vh - 61px);
  }
</style>
