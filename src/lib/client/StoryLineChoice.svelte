<script lang="ts">
  import _ from "lodash"
  import type { MultipleChoiceLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { createEventDispatcher, onDestroy, onMount } from "svelte"

  export let line: MultipleChoiceLine
  export let complete: boolean = false

  type Choice = MultipleChoiceLine["choices"][0]
  const dispatch = createEventDispatcher()

  let chosen: Set<Choice> = new Set()

  async function choose(choice: Choice) {
    if (complete) return
    chosen = chosen.add(choice)
    if (choice.correct) {
      dispatch("correct")
    }
  }

  function onKeydown(ev: KeyboardEvent) {
    for (let i = 0; i < line.choices.length; i++) {
      const choice = line.choices[i]!
      if (ev.key === (i + 1).toString()) {
        choose(choice)
      }
    }
  }

  onMount(() => {
    window.addEventListener("keydown", onKeydown)
  })

  onDestroy(() => {
    window.removeEventListener("keydown", onKeydown)
  })
</script>

<div>
  <Sprachdown source={line.question} />
  <ul class="choices">
    {#each line.choices as choice, i}
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
  .choices {
    display: flex;
    padding: 0;
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
