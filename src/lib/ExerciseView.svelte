<script lang="ts">
  import type { Exercise } from "./Exercise"
  import ExerciseViewFillblank from "./ExerciseViewFillblank.svelte"
  import ExerciseViewChoice from "./ExerciseViewChoice.svelte"
  import type { Base64Audio } from "./SpeechSystem"
  import { createEventDispatcher } from "svelte"

  export let exercise: Exercise
  export let audioPromise: Promise<Base64Audio> | undefined = undefined
  const dispatch = createEventDispatcher()
</script>

{#if exercise.type === "fillblank"}
  <ExerciseViewFillblank
    {exercise}
    {audioPromise}
    on:correct={() => dispatch("correct")}
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
