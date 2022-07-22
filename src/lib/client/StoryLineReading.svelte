<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { ReadingLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { onMount } from "svelte"
  import sprachy from "$lib/sprachy"
  import AlienText from "./AlienText.svelte"
  import SoundIndicator from "$lib/SoundIndicator.svelte"

  export let line: ReadingLine
  export let flip: boolean = false
  export let staticMode: boolean = false
  const { user, speech } = sprachy.maybeSPA()
  let playingSound: boolean = false

  async function playSound() {
    if ($user?.enableSpeechSynthesis && !playingSound) {
      playingSound = true
      try {
        await speech!.speakLine(line)
      } finally {
        playingSound = false
      }
    }
  }

  if (!staticMode) onMount(playSound)
</script>

<div class="reading">
  {#if line.from === "narrator"}
    <div>
      {line.message}
    </div>
  {:else if line.from === "explainer"}
    <div class="explainer">
      {line.message}
    </div>
  {:else}
    <Message from={line.from} {flip}>
      <div
        class="withTooltip"
        class:hasTranslation={!!line.translation}
        data-tooltip={line.translation}
      >
        {#if $user?.enableSpeechSynthesis}
          <SoundIndicator playing={playingSound} on:click={playSound} />
        {/if}
        {#if line.alien}
          <AlienText source={line.message} />
        {:else}
          <Sprachdown inline source={line.message} />
        {/if}
      </div>
      <div slot="after">
        <!-- <div class="translation">
          <Sprachdown inline source={line.translation} />
        </div> -->
        {#if line.explanation}
          <div class="explanation">
            <Sprachdown inline source={line.explanation} />
          </div>
        {/if}
      </div>
    </Message>
    {#if line.image}
      <img alt={line.imageAlt} src={line.image} />
    {/if}
  {/if}
</div>

<style>
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
