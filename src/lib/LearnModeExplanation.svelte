<script lang="ts">
  import type { Pattern } from "$lib/Pattern"
  import { createEventDispatcher } from "svelte"
  import sprachy from "./sprachy"
  import Sprachdown from "./Sprachdown.svelte"

  export let pattern: Pattern

  const dispatch = createEventDispatcher()

  async function explanationRead() {
    dispatch("complete")
  }
</script>

<article class="explanation">
  <h1>
    {pattern.title}
  </h1>
  <Sprachdown source={pattern.explanation} />
  <button class="btn btn-success" on:click={explanationRead}>
    Continue to exercises
  </button>
</article>

<style>
  article {
    max-width: 800px;
    margin: auto;
    padding: 0 1rem;
    padding-bottom: 4rem;
  }
</style>
