<script lang="ts">
  import _ from "lodash"
  import { createEventDispatcher, onMount } from "svelte"
  import Message from "./Message.svelte"
  import type { FillblankLine } from "../common/Pattern"
  import { matchAnswer } from "./feedback"
  import Sprachdown from "./Sprachdown.svelte"
  import sprachy from "./sprachy"

  export let line: FillblankLine
  export let flip: boolean = false
  export let complete: boolean = false
  let prevLine = line
  let attemptInput!: HTMLInputElement
  let attempt: string = ""
  let feedback: string = ""

  const dispatch = createEventDispatcher()

  onMount(() => attemptInput.focus())

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
    const result = matchAnswer(attempt, line)
    if (result.validAnswer) {
      attempt = result.validAnswer
      sprachy.effects.spawnParticlesAt(attemptInput)
      dispatch("correct")
    } else {
      if (result.feedback) {
        feedback = result.feedback
      }
      attemptInput.focus()
      // dispatch("answer", { correct: false })
    }
  }
</script>

<Message from={line.from} {flip}>
  <form on:submit|preventDefault={checkAnswer}>
    <Sprachdown inline source={parts.before} />
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class="fillblank"
      type="text"
      bind:value={attempt}
      bind:this={attemptInput}
      placeholder={line.hint}
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      size={inputWidthChars}
      disabled={complete}
    />
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

<style lang="sass">
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

input.fillblank::placeholder
  color: #86abff
  font-size: 80%

input.fillblank:disabled
  background-color: transparent
  border: 0

.feedback
  color: #0b9bc7
</style>
