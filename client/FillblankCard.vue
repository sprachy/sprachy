<template>
  <div class="FillblankCard">
    <b-card>
      <b-form @submit.prevent="checkAnswer">
        <div class="filling">
          <div class="content">
            <runtime-template-compiler :template="parts.content" />
            <!-- <span>{{ parts.before }}</span>
            <span class="fillblank" :style="{ minWidth: clozeWidth + 'px' }"
              >&#8203;{{ attempt }}&#8203;</span
            >
            <span>{{ parts.after }}</span> -->
          </div>
        </div>
        <fieldset>
          <input
            type="text"
            v-model="attempt"
            placeholder="Your Answer"
            ref="attemptInput"
            autofocus
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
import { Component, Prop, Ref, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Exercise } from "../common/api"
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
  attempt: string = ""
  effects: CanvasEffects = new CanvasEffects()

  checkAnswer() {
    const match = this.possibleAnswers.find((ans) =>
      matchesAnswerPermissively(this.attempt, ans)
    )
    if (match) {
      this.effects.spawnParticlesAt(this.attemptInput)
      this.$emit("answer", true)
    } else {
      this.$emit("answer", false)
    }
  }

  get parts() {
    let alternatives: string[] = []
    let translation = ""
    const content = this.exercise.content.replace(
      /\[(.+?)\]/,
      (match, inner) => {
        if (!alternatives) {
          alternatives = inner.split("|")
          const longestAnswer = _.sortBy(alternatives, (s) => -s.length)[0]
          const width = longestAnswer ? longestAnswer.length * 9 : 0
          //   return `
          //   <span class="fillblank" :style="{ minWidth: ${width} + 'px' }">&#8203;{{ attempt }}&#8203;</span>
          // `
          return inner
        } else {
          translation = inner
          return `<strong>${translation}</strong>`
        }
      }
    )

    console.log(content)

    return { content, translation, alternatives }
  }

  get possibleAnswers() {
    return this.parts.alternatives
  }

  // get translationHtml() {
  //   return this.exercise.translation.replace(/\[.+?\]/, (substring) => {
  //     const highlight = substring.slice(1, -1)
  //     return `<strong>${highlight}</strong>`
  //   })
  // }
}
</script>

<style lang="sass" scoped>
.FillblankCard::v-deep
  margin: auto
  max-width: 400px
  text-align: center

  // @media (max-width: $mobile)
  //   padding-left: 5vw
  //   padding-right: 5vw

.card
  box-shadow: 0 7px 50px rgba(46,10,99,.05), 0 1px 1px 0.6px rgba(46,10,99,.1)
  border-radius: 8px

.card-body
  padding: 0

.filling
  padding: 2rem
  font-size: 1.05rem
  line-height: 2rem
  white-space: pre-wrap

  // @media (max-width: $mobile)
  //   padding: 1.5rem

span.fillblank
  color: #64b5f6
  border-bottom: 2px solid #5f6368
  min-width: 20px
  display: inline-block
  text-align: center
  line-height: 1.5rem

.translation ::v-deep
  strong
    color: #64b5f6

input
  width: 100%
  padding: 1rem
  border: 0
  text-align: center
  border-radius: 0 0 8px 8px
  // https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/
  font-size: 16px

input:focus
  outline: none

fieldset
  position: relative

  fieldset button
    position: absolute
    padding: 0 20px
    right: 5px
    height: 100%
    font-size: 1.3em
    line-height: 1em
    border: none
    background: none

.FillblankCard.incorrect
  span.fillblank
    color: rgba(255, 77, 77, 0.8)

    input
      background: rgba(255, 77, 77, 0.8)

    input, fieldset svg
      color: white

    .reviseFeedback
      margin-top: 1rem
      text-align: center
</style>
