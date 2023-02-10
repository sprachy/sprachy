<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onMount } from "svelte"
  import Message from "$lib/Message.svelte"
  import type { Pattern } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { matchAnswer } from "$lib/client/feedback"
  import sprachy from "$lib/sprachy"
  import AudioForLine from "$lib/AudioForLine.svelte"
  import type { FillblankExercise } from "./Exercise"

  const { speech, effects } = sprachy.expectSPA()

  export let exercise: FillblankExercise
  export let flip: boolean = false
  export let complete: boolean = false
  export let pattern: Pattern | null = null
  let attemptInput!: HTMLInputElement
  let attempt: string = ""
  let feedback: string = ""
  let showingAnswer: boolean = false
  let audio: AudioForLine

  /* When the user got the right answer, and we're waiting for the sound
   * to play before moving on. */
  let playingPostAnswerSound: boolean = false

  const dispatch = createEventDispatcher()

  onMount(() => {
    attemptInput.focus()
  })

  $: parts = ((exercise: FillblankExercise) => {
    const [before, after] = exercise.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(exercise)

  // How many characters we expect to go in the input
  // Length of the longest answer, or the hint if it's longer
  $: inputWidthChars = ((exercise: FillblankExercise) => {
    const words = exercise.validAnswers
    if (exercise.hint) {
      words.push(exercise.hint)
    }
    const longestAnswer = _.sortBy(words, (s) => -s.length)[0]
    return longestAnswer!.length
  })(exercise)

  $: translation = ((ex: FillblankExercise) => {
    return exercise.translation?.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  })(exercise)

  $: attemptMatch = matchAnswer(attempt, exercise)

  function showAnswer() {
    showingAnswer = true
    attempt = ""
    feedback = ""
    attemptInput.focus()
  }

  export async function checkAnswer() {
    feedback = ""
    showingAnswer = false
    if (attempt === "") return

    if (playingPostAnswerSound) {
      // User pressed enter twice or such, skip sound and continue
      speech.skip()
      return
    }

    if (attemptMatch.validAnswer) {
      // Change user's input as needed to show them we're accounting
      // for any variation in casing or typo etc
      attempt = attemptMatch.validAnswer
      effects.confetti.spawnAt(attemptInput)

      if (audio) {
        playingPostAnswerSound = true
        try {
          await audio.playSound()
        } finally {
          playingPostAnswerSound = false
        }
      }

      dispatch("correct")
    } else {
      if (attemptMatch.feedback) {
        feedback = attemptMatch.feedback
      }
      attemptInput.focus()
    }
  }
</script>

<div>
  <Message from={exercise.from} {flip}>
    <form on:submit|preventDefault={checkAnswer}>
      <AudioForLine
        opts={exercise}
        bind:this={audio}
        disabled={!playingPostAnswerSound}
      />
      <Sprachdown inline source={parts.before} />
      <!-- svelte-ignore a11y-autofocus -->
      <input
        class="fillblank"
        type="text"
        bind:this={attemptInput}
        bind:value={attempt}
        placeholder={exercise.hint}
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        size={inputWidthChars}
        disabled={complete}
      />
      {#if exercise.hint && attempt.length}
        <div class="overhint">
          {exercise.hint}
        </div>
      {/if}
      <Sprachdown inline source={parts.after} />
    </form>
    <div slot="after">
      {#if translation}
        <div class="translation">
          <Sprachdown inline source={translation} />
        </div>
      {/if}
      {#if feedback}
        <div class="feedback">
          <Sprachdown inline source={feedback} />
          <button class="btn-link show-answer" on:click={showAnswer}>
            {#if exercise.explanation}
              Explain answer
            {:else}
              Show me
            {/if}
          </button>
        </div>
      {/if}
      {#if showingAnswer}
        <div class="explanation">
          {#if exercise.explanation}
            <Sprachdown inline source={exercise.explanation} />
          {:else}
            The answer is <em>{exercise.canonicalAnswer}</em>.
          {/if}
          {#if pattern}
            Pattern: <a target="_blank" href={`/${pattern.slug}`}
              >{pattern.title}</a
            >
          {/if}
        </div>
      {/if}
    </div>
  </Message>
</div>

<style>
  .translation :global(strong) {
    color: #86abff;
  }

  .translation {
    padding-top: 0.4rem;
    font-size: 90%;
    color: #444;
  }

  .explanation {
    padding-top: 0.8rem;
    color: #444;
    font-size: 90%;
    color: #0b9bc7;
  }

  input.fillblank {
    color: #64b5f6;
    border: 0;
    border-bottom: 2px solid #dcddde;
    display: inline-block;
    text-align: center;
    line-height: 1.5rem;
    -webkit-appearance: none;
  }

  input.fillblank:focus {
    outline: none;
  }

  .overhint,
  input.fillblank::placeholder {
    color: #86abff;
    font-size: 80%;
  }

  input.fillblank:disabled {
    background-color: transparent;
    border: 0;
  }

  .feedback {
    color: #0b9bc7;
  }

  .overhint {
    position: absolute;
    top: -0.2rem;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -100%);
  }

  .show-answer {
    font-size: 90%;
    color: #0b9bc7;
  }
</style>
