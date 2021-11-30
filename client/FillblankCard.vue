<template>
  <div class="FillblankCard">
    <b-card>
      <b-form @submit.prevent="checkAnswer">
        <div class="filling">
          <div class="message">
            <avatar :character="exercise.from" />
            <div>
              <div class="username">Scientist</div>
              <div class="quote-and-translation">
                <div class="quote">
                  <span>{{ parts.before }}</span>
                  <span
                    :class="{
                      fillblank: true,
                      hasinput: !!attempt.length,
                    }"
                    :style="{ minWidth: clozeWidth + 'px' }"
                    :data-hint="exercise.hint"
                    >&#8203;{{ attempt }}&#8203;</span
                  >
                  <span>{{ parts.after }}</span>
                </div>
                <div class="translation" v-html="translation" />
              </div>
            </div>
          </div>
        </div>
        <fieldset class="input-area">
          <input
            type="text"
            v-model="attempt"
            placeholder="Your Answer"
            ref="attemptInput"
          />
          <!-- <button>
          <FontAwesomeIcon icon="faChevronRight" />
        </button> -->
        </fieldset>
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Provide,
  Ref,
  Vue,
  Watch,
} from "vue-property-decorator"
import _ from "lodash"
import type { Exercise } from "../common/sprachdex"
import { levenshtein } from "./levenshtein"
import { CanvasEffects } from "./CanvasEffects"
// @ts-ignore
import { RuntimeTemplateCompiler } from "vue-runtime-template-compiler"

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

export function matchesAnswerPermissively(
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

@Component({
  components: {
    RuntimeTemplateCompiler,
  },
})
export default class FillblankCard extends Vue {
  @Prop({ type: Object, required: true }) exercise!: Exercise
  @Ref("attemptInput") attemptInput!: HTMLInputElement
  effects: CanvasEffects = new CanvasEffects()
  attempt: string = ""

  activated() {
    this.attemptInput.focus()
  }

  get parts() {
    const [before, after] = this.exercise.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  }

  get clozeWidth() {
    const longestAnswer = _.sortBy(
      this.exercise.validAnswers.concat([this.exercise.hint]),
      (s) => -s.length
    )[0]
    return longestAnswer ? longestAnswer.length * 9 : 0
  }

  get translation() {
    return this.exercise.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `<strong>${highlight}</strong>`
    })
  }

  checkAnswer() {
    const match = [this.exercise.canonicalAnswer].find((ans) =>
      matchesAnswerPermissively(this.attempt, ans)
    )
    if (match) {
      this.effects.spawnParticlesAt(this.attemptInput)
      this.$emit("answer", true)
    } else {
      this.$emit("answer", false)
    }
    this.attempt = ""
  }
}
</script>

<style lang="sass" scoped>
.FillblankCard
  margin: auto
  max-width: 600px

  // @media (max-width: $mobile)
  //   padding-left: 5vw
  //   padding-right: 5vw

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

  // @media (max-width: $mobile)
  //   padding: 1.5rem

.message
  display: flex

  ::v-deep .avatar
    margin-top: calc(4px - 0.125rem)
    width: 40px
    height: 40px
    border-radius: 50%
    margin-right: 15px

  .username
    font-size: 1rem
    font-weight: 500
    color: #fff
    line-height: 1.375rem

  .quote
    padding: 0.3rem
    font-size: 1.1rem
    line-height: 1.375rem
    color: var(--text-normal)
    font-weight: 400
    color: #dcddde

  .translation
    padding-top: 2rem
    color: rgba(220, 221, 222, 0.7)
    text-align: center

  .translation ::v-deep strong
    color: #86abff

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

span.fillblank.hasinput::after
  display: none

span.fillblank.hasinput::before
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

  // input::placeholder
  //   color: #b5b5b5

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
