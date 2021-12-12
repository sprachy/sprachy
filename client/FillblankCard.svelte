<script lang="ts">
  import _ from "lodash"
  import type { Exercise } from "../common/sprachdex"
  import { levenshtein } from "./levenshtein"
  import { CanvasEffects } from "./CanvasEffects"
  import { createEventDispatcher, onMount } from "svelte"

  export let exercise: Exercise
  let attemptInput!: HTMLInputElement
  let effects: CanvasEffects = new CanvasEffects()
  let attempt: string = ""

  const dispatch = createEventDispatcher()

  onMount(() => attemptInput.focus())

  $: parts = ((exercise: Exercise) => {
    const [before, after] = exercise.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(exercise)

  $: clozeWidth = ((exercise: Exercise) => {
    const words = exercise.validAnswers
    if (exercise.hint) {
      words.push(exercise.hint)
    }
    const longestAnswer = _.sortBy(words, (s) => -s.length)[0]
    return longestAnswer ? longestAnswer.length * 9 : 0
  })(exercise)

  $: translation = ((exercise: Exercise) => {
    return exercise.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `<strong>${highlight}</strong>`
    })
  })(exercise)

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
    const match = exercise.validAnswers.find((ans) =>
      matchesAnswerPermissively(attempt, ans)
    )
    if (match) {
      attempt = ""
      effects.spawnParticlesAt(attemptInput)
      dispatch("answer", { correct: true })
    } else {
      dispatch("answer", { correct: false })
    }
  }
</script>

<div class="FillblankCard">
  <div class="card">
    <div class="card-body">
      <form on:submit|preventDefault={checkAnswer}>
        <div class="filling">
          <!-- <plapper-message :from="exercise.from"> -->
          <div class="quote">
            <span>{parts.before}</span>
            <span
              class:fillblank={true}
              class:hasInput={!!attempt.length}
              style="minWidth: {clozeWidth + 'px'}"
              data-hint={exercise.hint}>&#8203;{attempt}&#8203;</span
            >
            <span>{parts.after}</span>
          </div>
          <div class="translation">{@html translation}</div>
          <!-- </plapper-message> -->
        </div>
        <fieldset class="input-area">
          <input
            type="text"
            placeholder="Your Answer"
            bind:value={attempt}
            bind:this={attemptInput}
          />
          <!-- <button>
        <FontAwesomeIcon icon="faChevronRight" />
      </button> -->
        </fieldset>
      </form>
    </div>
  </div>
</div>

<style lang="sass" scoped>
.FillblankCard
  margin: auto
  max-width: 600px

.card
  box-shadow: 0 7px 50px rgba(46,10,99,.05), 0 1px 1px 0.6px rgba(46,10,99,.1)
  border-radius: 8px
  background-color: #36393e

.card-body
  padding: 0

.filling
  padding: 2rem
  font-size: 1.05rem
  line-height: 2rem

// .message
//   .translation ::v-deep strong
//     color: #86abff

span.fillblank
  color: #64b5f6
  border-bottom: 2px solid #dcddde
  min-width: 20px
  display: inline-block
  text-align: center
  line-height: 1.5rem

span.fillblank::after // Hint goes inside the field at first
  color: #86abff
  content: attr(data-hint)
  font-size: 80%
  vertical-align: top

// span.fillblank::before // Moves above it when there's input
//   color: #5f6368
//   content: attr(data-hint)
//   font-size: 80%
//   vertical-align: top
//   display: block
//   opacity: 0

span.fillblank.hasInput::after
  display: none

span.fillblank.hasInput::before
  opacity: 1

.input-area
  position: relative

  input
    background-color: #40444b
    color: #dcddde
    caret-color: #dcddde
    width: 100%
    padding: 1rem
    border: 0
    text-align: center
    border-radius: 0 0 8px 8px
    // https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/
    font-size: 16px

  input:focus
    outline: none

  // fieldset button
  //   position: absolute
  //   padding: 0 20px
  //   right: 5px
  //   height: 100%
  //   font-size: 1.3em
  //   line-height: 1em
  //   border: none
  //   background: none
</style>
