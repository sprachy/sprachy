<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { ReadingLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import AlienText from "./AlienText.svelte"
  import AudioForLine from "$lib/AudioForLine.svelte"
  import type { Base64Audio } from "$lib/SpeechSystem"

  export let line: ReadingLine
  export let flip: boolean = false
  export let staticMode: boolean = false
  export let audioPromise: Promise<Base64Audio> | undefined = undefined
</script>

<div class="reading">
  <Message from={line.from} {flip} effect={line.effect}>
    <div
      class="withTooltip"
      class:hasTranslation={!!line.translation}
      data-tooltip={line.translation}
    >
      {#if audioPromise}
        <AudioForLine {line} {audioPromise} playImmediately={!staticMode} />
      {/if}
      {#if line.alien}
        <AlienText source={line.message} />
      {:else}
        <Sprachdown inline source={line.message} />
      {/if}
    </div>
  </Message>
  {#if line.image}
    <img alt={line.imageAlt} src={line.image} />
  {/if}
</div>

<style>
  .hidden {
    display: none;
  }
  .withTooltip {
    display: inline-flex;
    align-items: center;
  }

  .withTooltip.hasTranslation :global(p) {
    text-decoration: underline #ccc dotted;
  }

  .withTooltip.hasTranslation {
    cursor: default;
  }

  .explanation {
    padding-top: 0.8rem;
    color: #444;
    font-size: 90%;
    color: #0b9bc7;
  }

  img {
    max-height: 300px;
    margin-top: 1rem;
  }

  .explainer {
    padding-top: 0.8rem;
    color: #444;
    color: #0b9bc7;
  }
</style>
