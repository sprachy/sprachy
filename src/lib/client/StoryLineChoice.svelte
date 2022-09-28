<script lang="ts">
  import _ from "lodash"
  import type { MultipleChoiceLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { createEventDispatcher } from "svelte"
  import Choices from "$lib/Choices.svelte"

  export let line: MultipleChoiceLine
  export let complete: boolean = false

  type Choice = MultipleChoiceLine["choices"][0]
  const dispatch = createEventDispatcher()
</script>

<div>
  <Sprachdown source={line.question} />
  <Choices
    choices={line.choices}
    on:correct={() => dispatch("correct")}
    {complete}
  />
</div>

<style>
</style>
