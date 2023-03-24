<script setup lang="ts">
import exercises from "~/assets/vqa-exercises.json"
import Choices from "~/components/Choices.vue"
import { uniq } from 'lodash-es'

const app = useSprachyApp()
const user = await getCurrentUser()
const { speech } = app

const learnedLemmaSet = new Set(user.learnedLemmas)

const savedQuestionId = localStorage.getItem("mlLastQuestionId")

let initialQuestionIndex = exercises.findIndex(
  (q) => q.id.toString() === savedQuestionId
)
initialQuestionIndex = initialQuestionIndex === -1 ? 0 : initialQuestionIndex

const state = defineState({
  questionIndex: initialQuestionIndex,

  get currentQuestion() {
    return exercises[this.questionIndex]
  },

  get questionTokens() {
    const questionTokens: CompleteVQA['tokens'] = []
    for (const t of vqa.tokens) {
      questionTokens.push(t)
      if (t.token === '?') {
        break
      }
    }
    return questionTokens
  },

  get choices() {
    return this.currentQuestion.choices.map(c => ({
      text: c.de,
      correct: c.correct
    }))
  },

  get imgUrl() {
    return `/val2014/COCO_val2014_${this.currentQuestion.imageId
      .toString()
      .padStart(12, "0")}.jpg`
  }
})

async function toNextQuestion() {
  api.reportProgress({
    learnedLemmas: uniq(state.currentQuestion.tokens.map(t => t.lemma)),
  })
  state.questionIndex += 1
  await prepareNext()
}

watch(() => state.currentQuestion, () => {
  localStorage.setItem(
    "mlLastQuestionId",
    state.currentQuestion.id.toString()
  )
  speech.say({ from: "narrator", message: state.currentQuestion.question.de })
})

async function prepareNext() {
  const nextQuestion = exercises[state.questionIndex + 1]
  if (!nextQuestion) return

  speech.preload({
    from: "narrator",
    message: nextQuestion.question.de,
  })
  for (const choice of nextQuestion.choices) {
    speech.preload({
      from: "narrator",
      message: choice.de,
    })
  }
}
</script>

<template>
  <main>
    <div v-if="state.currentQuestion">
      <img :src="state.imgUrl" alt="Identify this" />
      <div :key="state.currentQuestion.id">
        <p class="hover-translate" :data-tooltip="state.currentQuestion.question.en">
          <span
            :class="{ token: true, punctuation: token.token.match(/^[.,!?]$/), new: !learnedLemmaSet.has(token.lemma) }"
            v-for="token in state.questionTokens">{{ token.token }}</span>
        </p>
        <Choices :choices="state.choices" @correct="toNextQuestion" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 1.1rem;
  margin-top: 1rem;
  text-align: center;
}

main>div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.token:not(.punctuation):not(:first-child) {
  margin-left: 0.2rem;
}

.token.new {
  color: blue;
}
</style>
