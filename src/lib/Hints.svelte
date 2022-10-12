<script lang="ts">
  import type { MultipleChoiceExercise } from "./Exercise"
  import Sprachdown from "$lib/Sprachdown.svelte"

  type Hint = MultipleChoiceExercise["hint"]
  export let hint: Hint
  export let engaged = false

  let hintUl: HTMLElement

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
    background-color: #d1cee9;
  }

  .hint button.engaged {
    background-color: #b7d7da;
  }
</style>
