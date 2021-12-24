<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { Story } from "../common/Pattern"
  import StoryLineReading from "./StoryLineReading.svelte"
  import StoryLineFillblank from "./StoryLineFillblank.svelte"

  export let story: Story
  let lineIndex: number
  $: if (story) {
    lineIndex = 0
  }

  $: lines = story.lines.slice(0, lineIndex + 1)
  $: currentLine = lines[lines.length - 1]!
  let finished: boolean = false

  let fillblank: StoryLineFillblank | null = null

  $: doingExercise = !finished && currentLine.type === "fillblank"

  const dispatch = createEventDispatcher()

  onMount(() => {
    window.addEventListener("keydown", onKeydown)
  })

  onDestroy(() => {
    window.removeEventListener("keydown", onKeydown)
  })

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !doingExercise) {
      continueStory()
    }
  }

  function nextLine() {
    if (lineIndex < story.lines.length - 1) {
      lineIndex += 1
    } else {
      finished = true
    }

    document.documentElement.scrollTop = document.documentElement.scrollHeight
  }

  function continueStory() {
    if (fillblank && false) {
      fillblank.checkAnswer()
    } else if (lineIndex < story.lines.length - 1) {
      nextLine()
    } else {
      dispatch("complete")
    }
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
            bind:this={fillblank}
            complete={finished || line !== currentLine}
          />
        {/if}
      </div>
    {/each}
  </div>
  <footer>
    <div class="container d-flex justify-content-end">
      <button class="btn btn-success btn-lg" on:click={continueStory}>Continue</button>
    </div>
  </footer>
</div>

<style lang="sass">
.Story
  margin: auto
  max-width: 600px

  .line:not(:first-child)
    margin-top: 1rem

  .lines
    padding-bottom: 10rem

  footer
    border-top: 1px solid #ccc
    position: fixed
    height: 8rem
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    width: 100%
    background-color: white

    > div
      padding: 2rem
</style>
