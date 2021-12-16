<script lang="ts">
  import _ from "lodash"
  import { levenshtein } from "./levenshtein"
  import { CanvasEffects } from "./CanvasEffects"
  import { createEventDispatcher, onMount } from "svelte"
  import Message from "./Message.svelte"
  import type { FillblankLine } from "../common/Pattern"

  export let line: FillblankLine
  export let complete: boolean = false
  let attemptInput!: HTMLInputElement
  let effects: CanvasEffects = new CanvasEffects()
  let attempt: string = ""

  const dispatch = createEventDispatcher()

  onMount(() => attemptInput.focus())

  $: parts = ((line: FillblankLine) => {
    const [before, after] = line.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(line)

  $: clozeWidth = ((line: FillblankLine) => {
    const words = line.validAnswers
    if (line.hint) {
      words.push(line.hint)
    }
    const longestAnswer = _.sortBy(words, (s) => -s.length)[0]
    return longestAnswer ? longestAnswer.length * 9 : 0
  })(line)

  $: translation = ((line: FillblankLine) => {
    return line.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `<strong>${highlight}</strong>`
    })
  })(line)

  /** Tolerate more egregious typos in longer answers */
  function distanceTolerance(s: string) {
    switch (s.length) {
      case 1:
      case 2:
      case 3:
        return 0
      case 4:
      case 5:
        return 1
      case 6:
      case 7:
        return 2
      default:
        return 2 + 1 * Math.floor(s.length / 7)
    }
  }

  function matchesAnswerPermissively(
    attempt: string,
    correctAnswer: string
  ): boolean {
    attempt = attempt.toLowerCase()
    correctAnswer = correctAnswer.toLowerCase()

    if (attempt === correctAnswer) {
      return true
    } else {
      const tolerance = distanceTolerance(correctAnswer)
      return levenshtein(attempt, correctAnswer) <= tolerance
    }
  }

  function checkAnswer() {
    const match = line.validAnswers.find((ans) =>
      matchesAnswerPermissively(attempt, ans)
    )
    if (match) {
      effects.spawnParticlesAt(attemptInput)
      dispatch("correct")
    } else {
      // dispatch("answer", { correct: false })
    }
  }
</script>

<Message from={line.from}>
  <form on:submit|preventDefault={checkAnswer}>
    <span>{parts.before}</span>
    <!-- <span
      class:fillblank={true}
    > -->

    <!-- svelte-ignore a11y-autofocus -->
    <input
      class="fillblank"
      type="text"
      bind:value={attempt}
      bind:this={attemptInput}
      style="min-width: {clozeWidth + 'px'}"
      placeholder={line.hint}
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      size={1}
      disabled={complete}
    />
    <span>{parts.after}</span>
  </form>
  <div class="translation" slot="after">{@html translation}</div>
</Message>

<style lang="sass">
.translation :global(strong)
  color: #86abff

.translation
  padding-top: 0.4rem
  font-size: 90%
  color: #444

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

input.fillblank::placeholder
  color: #86abff
  font-size: 80%

input.fillblank:disabled
  background-color: transparent
  border: 0
</style>
