<script lang="ts">
  import { browser } from "$app/environment"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"
  import type { MultipleChoiceExercise } from "./Exercise"
  import sprachy from "./sprachy"
  import Sprachdown from "$lib/Sprachdown.svelte"

  type Choice = MultipleChoiceExercise["choices"][0]
  export let choices: Choice[]
  export let complete = false

  const { speech, effects, user } = sprachy.expectSPA()
  let chosen: Set<Choice> = new Set()
  let choicesUl: HTMLUListElement
  let speechEnabled = false
  const dispatch = createEventDispatcher()

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
