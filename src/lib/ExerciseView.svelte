<script lang="ts">
  import type { Exercise } from "./Exercise"
  import ExerciseViewFillblank from "./ExerciseViewFillblank.svelte"
  import ExerciseViewChoice from "./ExerciseViewChoice.svelte"
  import type { Base64Audio } from "./SpeechSystem"
  import { createEventDispatcher } from "svelte"
  import type { Pattern } from "./Pattern"

  export let exercise: Exercise
  export let pattern: Pattern
  export let audioPromise: Promise<Base64Audio> | undefined = undefined
  const dispatch = createEventDispatcher()
</script>

{#if exercise.type === "fillblank"}
  <ExerciseViewFillblank
    {exercise}
    {audioPromise}
    on:correct={() => dispatch("correct")}
    {pattern}
  />
{:else if exercise.type === "choice"}
  <ExerciseViewChoice
    {exercise}
    {audioPromise}
    on:correct={() => dispatch("correct")}
  />
{/if}

<style>
</style>
