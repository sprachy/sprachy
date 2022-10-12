<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { Writable } from "svelte/store"
  import type { LearningPattern } from "./client/SprachyUserSPA"
  import PatternExplanation from "./PatternExplanation.svelte"
  import sprachy from "./sprachy"

  const learning = sprachy.expectSPA().learning as Writable<LearningPattern>

  const dispatch = createEventDispatcher()

  async function explanationRead() {
    dispatch("complete")
  }
</script>

<article class="explanation">
  <h1>
    {$learning.pattern.title}
  </h1>
  <PatternExplanation pattern={$learning.pattern} />
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
