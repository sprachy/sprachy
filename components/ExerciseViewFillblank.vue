<script setup lang="ts">
import type { Pattern } from "~/lib/Pattern"
import type { FillblankExercise } from "~/lib/Exercise"
import { matchAnswer } from "~/lib/feedback"
import Message from "~/components/Message.vue"
import Sprachdown from "~/components/Sprachdown.vue"
import AudioForLine from "~/components/AudioForLine.vue"
import { sortBy } from "lodash-es"

const props = defineProps<{
  exercise: FillblankExercise
  flip?: boolean
  complete?: boolean
  pattern?: Pattern
}>()

const emit = defineEmits<{
  (e: "correct"): void
}>()

const state = defineState({
  attempt: "",
  feedback: "",
  showingAnswer: false,
  playingPostAnswerSound: false,
  get parts() {
    const [before, after] = props.exercise.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  },
  // How many characters we expect to go in the input
  // Length of the longest answer, or the hint if it's longer
  get inputWidthChars() {
    const words = props.exercise.validAnswers
    if (props.exercise.hint) {
      words.push(props.exercise.hint)
    }
    const longestAnswer = sortBy(words, (s) => -s.length)[0]
    return longestAnswer!.length
  },
  get translation() {
    return props.exercise.translation?.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  },
  get attemptMatch() {
    return matchAnswer(state.attempt, props.exercise)
  }
})

const attemptInput = ref<HTMLInputElement>()
const audioForLine = ref<typeof AudioForLine>()

onMounted(() => {
  attemptInput.value!.focus()
})

function showAnswer() {
  state.showingAnswer = true
  state.attempt = ""
  state.feedback = ""
  attemptInput.value!.focus()
}

async function checkAnswer() {
  state.feedback = ""
  state.showingAnswer = false
  if (state.attempt === "") return
  if (state.playingPostAnswerSound) {
    // User pressed enter twice or such, skip sound and continue
    speech.skip()
    return
  }
  if (state.attemptMatch.validAnswer) {
    // Change user's input as needed to show them we're accounting
    // for any variation in casing or typo etc
    state.attempt = state.attemptMatch.validAnswer
    // effects.confetti.spawnAt(attemptInput.value!)
    await audioForLine.value?.playSound()
    emit("correct")
  } else {
    if (state.attemptMatch.feedback) {
      state.feedback = state.attemptMatch.feedback
    }
    attemptInput.value!.focus()
  }
}
</script>

<template>
  <div>
    <Message :from="exercise.from" :flip="flip">
      <form @submit.prevent="checkAnswer">
        <AudioForLine :opts="exercise" ref="audioForLine" :disabled="!state.playingPostAnswerSound" />
        <Sprachdown inline :source="state.parts.before" />
        <!-- svelte-ignore a11y-autofocus -->
        <input class="fillblank" type="text" ref="attemptInput" v-model="state.attempt" :placeholder="exercise.hint"
          autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" :size="state.inputWidthChars"
          :disabled="complete" />
        <div v-if="exercise.hint && state.attempt.length" class="overhint">
          {{ exercise.hint }}
        </div>
        <Sprachdown inline :source="state.parts.after" />
      </form>
      <div slot="after">
        <div v-if="state.translation" class="translation">
          <Sprachdown inline :source="state.translation" />
        </div>
        <div v-if="state.feedback" class="feedback">
          <Sprachdown inline :source="state.feedback" />
          <button class="btn-link show-answer" @click="showAnswer">
            <template v-if="exercise.explanation">
              Explain answer
            </template>
            <template v-else>
              Show me
            </template>
          </button>
        </div>
        <div v-if="state.showingAnswer" class="explanation">
          <Sprachdown v-if="exercise.explanation" inline :source="exercise.explanation" />
          <template v-else>
            The answer is <em>{{ exercise.canonicalAnswer }}</em>.
          </template>
          <template v-if="pattern">
            Pattern: <a target="_blank" :href="`/${pattern.slug}`">{{ pattern.title }}</a>
          </template>
        </div>
      </div>
    </Message>
  </div>
</template>

<style scoped>
.translation :deep(strong) {
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