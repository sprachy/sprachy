<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { StoryLine, Story, ReadingLine } from "$lib/Pattern"
  import StoryLineReading from "$lib/client/StoryLineReading.svelte"
  import StoryLineChoice from "$lib/client/StoryLineChoice.svelte"
  import SpecialLineMorph from "$lib/SpecialLineMorph.svelte"
  import { fly } from "svelte/transition"
  import { browser } from "$app/environment"
  import sprachy from "./sprachy"

  const { speech, user } = sprachy.maybeSPA()

  export let story: Story
  export let staticMode: boolean = false

  let lineIndex: number
  $: if (story) {
    lineIndex = staticMode ? story.length : 0
  }

  $: visibleLines = story.slice(0, lineIndex + 1)
  $: currentLine = visibleLines[visibleLines.length - 1]!
  let readyToComplete: boolean = staticMode ? true : false
  let lineRef: HTMLDivElement | null = null

  $: doingExercise = !readyToComplete && currentLine.type !== "reading"

  // We want to flip the line orientation each time the
  // speaker changes
  $: lineFlips = ((lines: StoryLine[]) => {
    let flip = false
    let prevFlippableLine: ReadingLine | null = null
    return lines.map((line) => {
      if (line.type !== "reading" || line.from === "narrator") {
        return false
      } else {
        if (prevFlippableLine && prevFlippableLine.from !== line.from) {
          flip = !flip
        }
        prevFlippableLine = line
        return flip
      }
    })
  })(story)

  $: if (speech && $user?.enableSpeechSynthesis) {
    for (const line of story) {
      if (line.type === "reading" && line.from && line.message) {
        speech.preload({ from: line.from, message: line.message })
      }
    }
  }

  const dispatch = createEventDispatcher()

  if (browser) {
    onMount(() => {
      window.addEventListener("keydown", onKeydown)
    })

    onDestroy(() => {
      window.removeEventListener("keydown", onKeydown)
    })
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !doingExercise) {
      continueStory()
    }
  }

  $: if (lineRef && !staticMode) {
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
    } else if (!readyToComplete) {
      readyToComplete = true
    }
  }

  export function continueStory() {
    if (doingExercise) {
      // User needs to do the exercise first, pass
    } else {
      nextLine()
    }
  }
</script>

<div class="Story">
  <div class="lines">
    {#each visibleLines as line, i}
      <div
        class:line
        in:fly={staticMode ? undefined : { y: 20, duration: 500 }}
        bind:this={lineRef}
      >
        {#if line.type === "reading"}
          {#if line.special === "morph"}
            <SpecialLineMorph {staticMode} {line} flip={lineFlips[i]} />
          {:else}
            <StoryLineReading {staticMode} {line} flip={lineFlips[i]} />
          {/if}
        {:else if line.type === "choice"}
          <StoryLineChoice
            {line}
            on:correct={nextLine}
            complete={readyToComplete || line !== currentLine}
          />
        {/if}
      </div>
    {/each}
  </div>
  {#if readyToComplete && !staticMode}
    <button
      class="btn btn-success mt-4 ms-4"
      on:click={() => dispatch("complete")}>Complete dialogue</button
    >
  {/if}
</div>

<style>
  .Story {
    margin: auto;
    max-width: 600px;
  }

  .Story .line:not(:first-child) {
    margin-top: 1rem;
  }

  .Story :global(strong) {
    color: rgb(28, 176, 246);
  }
</style>
