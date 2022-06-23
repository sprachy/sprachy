<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onMount } from "svelte"
  import Message from "$lib/Message.svelte"
  import type { FillblankLine, Pattern } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { matchAnswer } from "$lib/client/feedback"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"

  const { speech, effects } = sprachy.expectSPA()

  export let line: FillblankLine
  export let flip: boolean = false
  export let complete: boolean = false
  export let speakable: boolean = false
  export let pattern: Pattern | null = null
  let prevLine = line
  let attemptInput!: HTMLInputElement
  let attempt: string = ""
  let feedback: string = ""
  let showingAnswer: boolean = false
  let playingSound: boolean = false

  /* When the user got the right answer, and we're waiting for the sound
   * to play before moving on. */
  let playingPostAnswerSound: boolean = false

  const dispatch = createEventDispatcher()

  onMount(() => {
    attemptInput.focus()
    if (!complete) playSound()
  })

  $: if (line !== prevLine) {
    attempt = ""
    prevLine = line
  }

  $: parts = ((line: FillblankLine) => {
    const [before, after] = line.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(line)

  // How many characters we expect to go in the input
  // Length of the longest answer, or the hint if it's longer
  $: inputWidthChars = ((line: FillblankLine) => {
    const words = line.validAnswers
    if (line.hint) {
      words.push(line.hint)
    }
    const longestAnswer = _.sortBy(words, (s) => -s.length)[0]
    return longestAnswer!.length
  })(line)

  $: translation = ((line: FillblankLine) => {
    return line.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  })(line)

  $: attemptMatch = matchAnswer(attempt, line)

  function showAnswer() {
    showingAnswer = true
    attempt = ""
    feedback = ""
    attemptInput.focus()
  }

  async function playSound() {
    let text = !attemptMatch.validAnswer
      ? parts.before + (parts.before.length ? " ... was?" : "")
      : line.message.replace(/[[_*]+/g, "")

    playingSound = true
    try {
      if (text.length > 0) {
        await speech.characterSpeak(line.from, text)
      }
      // if (!attemptMatch.validAnswer) {
      //   // Representing the part that needs filling
      //   await speech.characterSpeak(line.from, "was")
      // }
    } finally {
      playingSound = false
    }
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

      if (speakable) {
        playingPostAnswerSound = true
        try {
          await playSound()
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
  <Message from={line.from} {flip}>
    <form on:submit|preventDefault={checkAnswer}>
      {#if speakable}
        <SoundIndicator playing={playingSound} on:click={playSound} />
      {/if}
      <Sprachdown inline source={parts.before} />
      <!-- svelte-ignore a11y-autofocus -->
      <input
        class="fillblank"
        type="text"
        bind:this={attemptInput}
        bind:value={attempt}
        placeholder={line.hint}
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        size={inputWidthChars}
        disabled={complete}
      />
      {#if line.hint && attempt.length}
        <div class="overhint">
          {line.hint}
        </div>
      {/if}
      <Sprachdown inline source={parts.after} />
    </form>
    <div slot="after">
      <div class="translation">
        <Sprachdown inline source={translation} />
      </div>
      {#if feedback}
        <div class="feedback">
          <Sprachdown inline source={feedback} />
          <button class="btn-link show-answer" on:click={showAnswer}>
            {#if line.explanation}
              Explain answer
            {:else}
              Show me
            {/if}
          </button>
        </div>
      {/if}
      {#if showingAnswer}
        <div class="explanation">
          {#if line.explanation}
            <Sprachdown inline source={line.explanation} />
          {:else}
            The answer is <em>{line.canonicalAnswer}</em>.
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
