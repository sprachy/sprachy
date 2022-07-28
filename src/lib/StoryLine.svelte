<script lang="ts">
  import StoryLineChoice from "./client/StoryLineChoice.svelte"
  import StoryLineReading from "./client/StoryLineReading.svelte"

  import type { StoryLine } from "./Pattern"
  import type { Base64Audio } from "./SpeechSystem"

  export let line: StoryLine
  export let audioPromise: Promise<Base64Audio> | undefined = undefined
  export let flip = false
  export let staticMode = false
</script>

{#if line.type === "reading"}
  <StoryLineReading {staticMode} {audioPromise} {line} {flip} />
{:else if line.type === "choice"}
  <StoryLineChoice
    {line}
    on:correct={nextLine}
    complete={finished || line !== currentLine}
  />
{/if}
