<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher } from "svelte"
  import type { Story } from "../common/Pattern"
  import StoryLineReading from "./StoryLineReading.svelte"
  import StoryLineFillblank from "./StoryLineFillblank.svelte"

  export let story: Story
  let lineIndex: number
  $: if (story) {
    lineIndex = 0
  }

  $: lines = story.lines.slice(0, lineIndex + 1)
  $: currentLine = lines[lines.length - 1]

  let attempt: string = ""
  const dispatch = createEventDispatcher()

  function nextLine() {
    lineIndex += 1
  }
</script>

<div class="Story">
  <div class="lines">
    {#each lines as line}
      <div class="line">
        {#if line.type === "reading"}
          <StoryLineReading {line} />
        {:else}
          <StoryLineFillblank
            {line}
            on:correct={nextLine}
            complete={line !== currentLine}
          />
        {/if}
      </div>
    {/each}
  </div>
  <hr />
  <div class="d-flex justify-content-end">
    <button
      class="btn btn-success"
      on:click={nextLine}
      disabled={lineIndex === story.lines.length - 1}>Continue</button
    >
  </div>
</div>

<style lang="sass">
.Story
  margin: auto
  max-width: 600px

  .lines
    height: 500px

  .line:not(:first-child)
    margin-top: 1rem
</style>
