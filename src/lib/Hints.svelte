<script lang="ts">
  import { browser } from "$app/environment"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { MultipleChoiceExercise } from "./Exercise"
  import sprachy from "./sprachy"
  import Sprachdown from "$lib/Sprachdown.svelte"

  type Hint = MultipleChoiceExercise["hint"]
  export let hint: Hint
  export let engaged = false

  const { user } = sprachy.expectSPA()
  let chosen: Set<Hint> = new Set()

  let hintUl: HTMLElement
  const dispatch = createEventDispatcher()

  async function engage() {
    engaged = !engaged
  }
</script>

<div class="hint" bind:this={hintUl}>
  <button
    class="btn btn-light"
    class:disengaged={!engaged}
    class:engaged
    on:click={() => engage()}
  >
    {#if engaged && hint}
      <Sprachdown inline source={hint} />
    {/if}
    {#if !engaged}
      <Sprachdown inline source={"Hint"} />
    {/if}
  </button>
</div>

<style>
  .hint {
    margin-right: 0.5rem;
    list-style: none;
  }

  .hint button.disengaged {
    background-color: #a39ece;
  }

  .hint button.engaged {
    background-color: #a1d7db;
  }
</style>
