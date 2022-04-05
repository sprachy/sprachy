<script lang="ts">
  import _, { at } from "lodash"
  import { createEventDispatcher, onMount } from "svelte"
  import Message from "$lib/Message.svelte"
  import type { FillblankLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { matchAnswer } from "$lib/client/feedback"
  import sprachy from "$lib/sprachy"

  const { spa } = sprachy.expectSPA()

  export let line: FillblankLine
  export let flip: boolean = false
  export let complete: boolean = false
  let prevLine = line
  let attemptInput!: HTMLInputElement
  let attempt: string = ""
  let feedback: string = ""
  let incorrectShake: boolean = false
  let shakeTimeout: number | undefined

  const dispatch = createEventDispatcher()

  onMount(() => {
    attemptInput.focus()
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

  export function checkAnswer() {
    feedback = ""
    if (attempt === "") return

    const result = matchAnswer(attempt, line)
    if (result.validAnswer) {
      attempt = result.validAnswer
      spa.effects.spawnParticlesAt(attemptInput)
      dispatch("correct")
    } else {
      if (result.feedback) {
        feedback = result.feedback
      }
      attemptInput.focus()
      incorrectShake = true
      clearTimeout(shakeTimeout)
      shakeTimeout = setTimeout(() => {
        incorrectShake = false
      }, 300) as any
      // dispatch("answer", { correct: false })
    }
  }
</script>

<div class:shake={incorrectShake}>
  <Message from={line.from} {flip}>
    <form on:submit|preventDefault={checkAnswer}>
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
        </div>
      {/if}
      {#if line.explanation}
        <div class="explanation">
          <Sprachdown inline source={line.explanation} />
        </div>
      {/if}
    </div>
  </Message>
</div>

<style lang="sass">
@import './shake.scss'

.shake
  @include animation(shake-base)

.translation :global(strong)
  color: #86abff

.translation
  padding-top: 0.4rem
  font-size: 90%
  color: #444

.explanation
  padding-top: 0.8rem
  color: #444
  font-size: 90%
  color: #0b9bc7

input.fillblank
  color: #64b5f6
  border: 0
  border-bottom: 2px solid #dcddde
  display: inline-block
  text-align: center
  line-height: 1.5rem
  -webkit-appearance: none

input.fillblank:focus
  outline: none

.overhint, input.fillblank::placeholder
  color: #86abff
  font-size: 80%

input.fillblank:disabled
  background-color: transparent
  border: 0

.feedback
  color: #0b9bc7

.overhint
  position: absolute
  top: -0.2rem
  left: 50%
  width: 100%
  transform: translate(-50%, -100%)
</style>
