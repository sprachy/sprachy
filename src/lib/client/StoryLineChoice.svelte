<script lang="ts">
  import _ from "lodash"
  import type { MultipleChoiceLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { createEventDispatcher } from "svelte"
  import Choices from "$lib/Choices.svelte"
  import AudioForLine from "$lib/AudioForLine.svelte"

  export let line: MultipleChoiceLine
  export let complete: boolean = false

  type Choice = MultipleChoiceLine["choices"][0]
  const dispatch = createEventDispatcher()
</script>

<div>
  <div class="question d-flex align-items-center mb-2">
    <AudioForLine opts={{ from: "narrator", message: line.question }} />
    <span class="me-1" />
    <Sprachdown inline source={line.question} />
  </div>
  <Choices
    choices={line.choices}
    on:correct={() => dispatch("correct")}
    {complete}
  />
</div>

<style>
</style>
