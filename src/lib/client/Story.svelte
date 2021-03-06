<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { StoryLine, Story } from "$lib/Pattern"
  import StoryLineReading from "$lib/client/StoryLineReading.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import StoryLineChoice from "$lib/client/StoryLineChoice.svelte"
  import { fly } from "svelte/transition"
  import sprachy from "$lib/sprachy"

  const { user } = sprachy.expectSPA()

  export let story: Story
  let lineIndex: number
  $: if (story) {
    lineIndex = 0
  }

  $: lines = story.slice(0, lineIndex + 1)
  $: currentLine = lines[lines.length - 1]!
  let finished: boolean = false

  let fillblankRef: StoryLineFillblank | null = null
  let lineRef: HTMLDivElement | null = null

  $: doingExercise = !finished && currentLine.type !== "reading"

  // We want to flip the line orientation each time the
  // speaker changes
  $: lineFlips = ((lines: StoryLine[]) => {
    let flip = false
    let prevFrom = lines[0] && "from" in lines[0] ? lines[0].from : null
    const flips: boolean[] = []
    for (const line of lines) {
      if (!("from" in line)) {
        continue
      }

      if (line.from !== prevFrom) {
        flip = !flip
        prevFrom = line.from
      }
      flips.push(flip)
    }
    return flips
  })(story)

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

  $: if (lineRef) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }

  async function nextLine() {
    if (lineRef) {
      // This is necessary for the window keydown event listener
      // to fire for the next line on firefox
      lineRef.querySelector("input")?.blur()
    }
    if (lineIndex < story.length - 1) {
      lineIndex += 1
    } else {
      finished = true
    }
  }

  function continueStory() {
    if (doingExercise && fillblankRef) {
      fillblankRef.checkAnswer()
    } else if (lineIndex < story.length - 1) {
      nextLine()
    } else {
      dispatch("complete")
    }
  }
</script>

<div class="Story">
  <div class="lines">
    {#each lines as line, i}
      <div
        class:line
        class:hinted={line.type === "fillblank" && line.hint}
        in:fly={{ y: 20, duration: 500 }}
        bind:this={lineRef}
      >
        {#if line.type === "reading"}
          <StoryLineReading
            {line}
            flip={lineFlips[i]}
            speakable={$user.enableSpeechSynthesis}
          />
        {:else if line.type === "fillblank"}
          <StoryLineFillblank
            speakable={$user.enableSpeechSynthesis}
            {line}
            flip={lineFlips[i]}
            on:correct={nextLine}
            bind:this={fillblankRef}
            complete={finished || line !== currentLine}
          />
        {:else if line.type === "choice"}
          <StoryLineChoice
            {line}
            on:correct={nextLine}
            complete={finished || line !== currentLine}
          />
        {/if}
      </div>
    {/each}
  </div>
  <footer>
    <div class="container d-flex justify-content-end">
      <button class="btn btn-success btn-lg" on:click={continueStory}
        >Continue</button
      >
    </div>
  </footer>
</div>

<style>
  .Story {
    margin: auto;
    max-width: 600px;
  }

  .Story .line:not(:first-child) {
    margin-top: 1rem;
  }

  .Story .line.hinted:not(:first-child) {
    margin-top: 2rem;
  }

  .Story footer {
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background-color: white;
  }

  .Story footer > div {
    padding: 2rem;
  }

  .Story :global(strong) {
    color: rgb(28, 176, 246);
  }
</style>
