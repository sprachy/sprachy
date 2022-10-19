<script lang="ts">
  import { browser } from "$app/environment"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { MultipleChoiceExercise } from "./Exercise"
  import sprachy from "./sprachy"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import Hints from "./Hints.svelte"

  type Choice = MultipleChoiceExercise["choices"][0]
  export let choices: Choice[]
  export let complete = false
  export let hint = ""

  const { speech, effects, user } = sprachy.expectSPA()
  let chosen: Set<Choice> = new Set()
  let choicesUl: HTMLUListElement
  let speechEnabled = false
  const dispatch = createEventDispatcher()

  for (const choice of choices) {
    speech.preload({ from: "narrator", message: choice.text })
  }

  if (browser) {
    onMount(() => {
      window.addEventListener("keydown", onKeydown)
      setTimeout(enableSpeech, 50)
    })

    onDestroy(() => {
      window.removeEventListener("keydown", onKeydown)
    })
  }

  async function choose(choice: Choice) {
    if (!complete) {
      chosen = chosen.add(choice)
      if (choice.correct) {
        effects.confetti.spawnAt(
          choicesUl.children[choices.indexOf(choice)] as HTMLElement
        )
        dispatch("correct")
      }
    }
  }

  function onKeydown(ev: KeyboardEvent) {
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i]!
      if (ev.key === (i + 1).toString()) {
        choose(choice)
      }
    }
  }

  function enableSpeech() {
    speechEnabled = true
  }

  function speakChoice(choice: Choice) {
    if ($user?.enableSpeechSynthesis && speechEnabled) {
      speech.say({ from: "narrator", message: choice.text })
    }
  }
</script>

<ul class="choices" bind:this={choicesUl}>
  {#if hint != ""}
    <li>
      <Hints {hint} />
    </li>
  {/if}
  {#each choices as choice, i}
    <li on:mouseenter={() => speakChoice(choice)}>
      <button
        class="btn btn-light"
        class:incorrect={chosen.has(choice) && !choice.correct}
        class:correct={chosen.has(choice) && choice.correct}
        on:click={() => choose(choice)}
      >
        <span class="number">{i + 1}</span>
        <Sprachdown inline source={choice.text} />
      </button>
    </li>
  {/each}
</ul>

<style>
  .choices {
    display: flex;
    padding: 0;
    margin: auto;
    max-width: 800px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .choices li {
    border: 1px solid #ccc;
    list-style: none;
    display: flex;
  }

  .choices li button.correct {
    background-color: #dff0d8;
  }

  .choices li button.incorrect {
    background-color: #f2dede;
  }
</style>
