<script lang="ts">
  import type { Exercise } from "./Exercise"
  import ExerciseViewFillblank from "./ExerciseViewFillblank.svelte"
  import ExerciseViewChoice from "./ExerciseViewChoice.svelte"
  import type { Base64Audio } from "./SpeechSystem"
  import { createEventDispatcher } from "svelte"
  import type { Pattern } from "./Pattern"

  export let exercise: Exercise
  export let pattern: Pattern
  const dispatch = createEventDispatcher()
</script>

{#if exercise.type === "fillblank"}
  <ExerciseViewFillblank
    {exercise}
    on:correct={() => dispatch("correct")}
    {pattern}
  />
{:else if exercise.type === "choice"}
  <ExerciseViewChoice {exercise} on:correct={() => dispatch("correct")} />
{/if}

<style>
</style>
