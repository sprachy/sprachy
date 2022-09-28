<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { ReadingLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import AudioForLine from "$lib/AudioForLine.svelte"

  export let line: ReadingLine
  export let flip: boolean = false
  export let staticMode: boolean = false
</script>

<div class="reading">
  {#if line.message}
    <Message from={line.from} {flip} tooltip={line.translation}>
      <div>
        <AudioForLine opts={line} playImmediately={!staticMode} />
        <Sprachdown inline source={line.message} />
      </div>
    </Message>
  {/if}
  {#if line.image}
    <img alt={line.imageAlt} src={line.image} />
  {/if}
</div>

<style>
  img {
    max-height: 300px;
    margin-top: 1rem;
  }
</style>
