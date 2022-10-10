<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import Message from "$lib/Message.svelte"
  import AudioForLine from "$lib/AudioForLine.svelte"
  import { createEventDispatcher } from "svelte"
  import type { MultipleChoiceExercise } from "./Exercise"
  import Choices from "./Choices.svelte"

  export let exercise: MultipleChoiceExercise

  const dispatch = createEventDispatcher()
</script>

<div class="exercise">
  {#if exercise.from && exercise.message}
    <Message from={exercise.from}>
      <AudioForLine opts={exercise} />
      <Sprachdown inline source={exercise.message} />
    </Message>
  {/if}
  {#if exercise.image}
    <img src={exercise.image} alt="Identify this" />
  {/if}
  {#if exercise.question}
    <div
      class="hover-translate question text-center mt-2 mb-2"
      data-tooltip={exercise.questionTranslation}
    >
      <AudioForLine
        opts={{ from: "narrator", message: exercise.question }}
        playImmediately
      />
      <span class="me-1" />
      <Sprachdown inline source={exercise.question} />
    </div>
  {/if}
  <Choices choices={exercise.choices} on:correct={() => dispatch("correct")} />
</div>

<style>
  .exercise {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .question {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
  img {
    max-height: 50vh;
  }
</style>
