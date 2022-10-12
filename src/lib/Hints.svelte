<script lang="ts">
  import type { MultipleChoiceExercise } from "./Exercise"
  import Sprachdown from "$lib/Sprachdown.svelte"

  type Hint = MultipleChoiceExercise["hint"]
  export let hint: Hint
  export let engaged = false

  async function engage() {
    engaged = !engaged
  }
</script>

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

<style>
  button.disengaged {
    background-color: #d1cee9;
  }

  button.engaged {
    background-color: #b7d7da;
  }
</style>
