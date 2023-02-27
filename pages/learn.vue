<script setup lang="ts">
import mlquestions from "~/assets/mlquestions.json"
import Choices from "~/components/Choices.vue"

const { speech } = useSprachyApp()

const questionsDataset = mlquestions
const savedQuestionId = localStorage.getItem("mlLastQuestionId")

let initialQuestionIndex = questionsDataset.findIndex(
  (q) => q.questionId.toString() === savedQuestionId
)
initialQuestionIndex = initialQuestionIndex === -1 ? 0 : initialQuestionIndex

const state = defineState({
  questionIndex: initialQuestionIndex,

  get currentQuestion() {
    return questionsDataset[this.questionIndex]
  },

  get choices() {
    return this.currentQuestion.choices.map((c) => ({
      text: c.de,
      correct: c.de === this.currentQuestion.answer.de,
    }))
  },

  get imgUrl() {
    return `/val2014/COCO_val2014_${this.currentQuestion.imageId
      .toString()
      .padStart(12, "0")}.jpg`
  }
})

async function toNextQuestion() {
  state.questionIndex += 1
  await prepareNext()
}

watch(() => state.currentQuestion, () => {
  localStorage.setItem(
    "mlLastQuestionId",
    state.currentQuestion.questionId.toString()
  )
  speech.say({ from: "narrator", message: state.currentQuestion.question.de })
})

async function prepareNext() {
  const nextQuestion = questionsDataset[state.questionIndex + 1]
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
      <div :key="state.currentQuestion.questionId">
        <p class="hover-translate" :data-tooltip="state.currentQuestion.question.en">
          {{ state.currentQuestion.question.de }}
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
</style>
