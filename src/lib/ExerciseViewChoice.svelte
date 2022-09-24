<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import Message from "$lib/Message.svelte"
  import AudioForLine from "$lib/AudioForLine.svelte"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import { browser } from "$app/env"
  import type { MultipleChoiceExercise } from "./Exercise"
  import type { Base64Audio } from "./SpeechSystem"
  import sprachy from "./sprachy"

  const { effects } = sprachy.expectSPA()

  export let exercise: MultipleChoiceExercise
  export let audioPromise: Promise<Base64Audio> | undefined = undefined
  let choicesUl: HTMLUListElement

  type Choice = MultipleChoiceExercise["choices"][0]
  const dispatch = createEventDispatcher()

  let chosen: Set<Choice> = new Set()

  async function choose(choice: Choice) {
    chosen = chosen.add(choice)
    if (choice.correct) {
      effects.confetti.spawnAt(
        choicesUl.children[exercise.choices.indexOf(choice)] as HTMLElement
      )
      dispatch("correct")
    }
  }

  function onKeydown(ev: KeyboardEvent) {
    for (let i = 0; i < exercise.choices.length; i++) {
      const choice = exercise.choices[i]!
      if (ev.key === (i + 1).toString()) {
        choose(choice)
      }
    }
  }

  if (browser) {
    onMount(() => {
      window.addEventListener("keydown", onKeydown)
    })

    onDestroy(() => {
      window.removeEventListener("keydown", onKeydown)
    })
  }
</script>

<div class="exercise">
  {#if exercise.from && exercise.message}}
    <Message from={exercise.from}>
      {#if audioPromise}
        <AudioForLine {audioPromise} />
      {/if}
      <Sprachdown inline source={exercise.message} />
    </Message>
  {/if}
  {#if exercise.image}
    <img src={exercise.image} alt="Identify this" />
  {/if}
  {#if exercise.question}
    <div
      class="hover-translate text-center mt-2 mb-2"
      data-tooltip={exercise.questionTranslation}
    >
      <Sprachdown inline source={exercise.question} />
    </div>
  {/if}
  <ul class="choices" bind:this={choicesUl}>
    {#each exercise.choices as choice, i}
      <li>
        <button
          class="btn btn-light"
          class:incorrect={chosen.has(choice) && !choice.correct}
          class:correct={chosen.has(choice) && choice.correct}
          on:click={() => choose(choice)}
        >
          <span class="number">{i + 1}</span>
          {choice.text}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .exercise {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-height: 50vh;
  }

  .choices {
    display: flex;
    padding: 0;
    margin: auto;
  }

  .choices li {
    border: 1px solid #ccc;
    margin-right: 0.5rem;
    list-style: none;
  }

  .choices li button.correct {
    background-color: #dff0d8;
  }

  .choices li button.incorrect {
    background-color: #f2dede;
  }
</style>
