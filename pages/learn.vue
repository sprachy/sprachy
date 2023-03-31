<script setup lang="ts">
import vqas from "~/data/vqas.json"
import Choices from "~/components/Choices.vue"
import { uniq } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencil, faSave, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { tokenize } from "~/lib/tokenize"

const app = useSprachyApp()
const user = await getCurrentUser()
const isDev = process.dev
const { speech } = app
const allVQAs = vqas as PartialVQA[]

const exercises = reactive(
  allVQAs.filter(v => v.question.de && v.choices?.length) as CompleteVQA[]
)

const learnedLemmaSet = new Set(user!.learnedLemmas)

const savedQuestionId = localStorage.getItem("mlLastQuestionId")

let initialQuestionIndex = exercises.findIndex(
  (q) => q.id.toString() === savedQuestionId
)
initialQuestionIndex = initialQuestionIndex === -1 ? 0 : initialQuestionIndex

const state = defineState({
  questionIndex: initialQuestionIndex,
  editingVQA: null as CompleteVQA | null,

  get currentQuestion() {
    return exercises[this.questionIndex]
  },

  get questionTokens() {
    return tokenize(this.currentQuestion.question.de)
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
  const newLemmas = uniq(state.questionTokens.map(t => t.value))
  for (const lemma of newLemmas) {
    learnedLemmaSet.add(lemma)
  }
  api.reportProgress({
    learnedLemmas: newLemmas,
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

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})

function onKeydown(ev: KeyboardEvent) {
  if (ev.key === 'Backspace') {
    deleteExercise()
  }
}

async function gotoPrev() {
  state.questionIndex -= 1
}

async function toggleEditMode() {
  if (state.editingVQA) {
    exercises[state.questionIndex] = state.editingVQA
    await api.dev.updateExercise(state.editingVQA.id, state.editingVQA)
    state.editingVQA = null
  } else {
    state.editingVQA = { ...state.currentQuestion }
  }
}

async function deleteExercise() {
  const deletingQuestionId = state.currentQuestion.id
  state.questionIndex += 1
  await Promise.all([
    prepareNext(),
    api.dev.deleteExercise(deletingQuestionId)
  ])
}
</script>

<template>
  <main>
    <div v-if="isDev" class="devbar">
      <button class="btn s-btn-faded" v-if="state.questionIndex > 0" @click="gotoPrev">
        <FontAwesomeIcon fixedWidth :icon="faArrowLeft" />
      </button>
      <button class="btn s-btn-faded" @click="toggleEditMode">
        <FontAwesomeIcon fixedWidth :icon="state.editingVQA ? faSave : faPencil" />
      </button>
      <button class="btn s-btn-faded" @click="deleteExercise">
        <FontAwesomeIcon fixedWidth :icon="faTrash" />
      </button>
    </div>
    <template v-if="state.currentQuestion">
      <div v-if="!state.editingVQA" class="exercise">
        <nuxt-img :src="state.imgUrl" alt="Identify this" />
        <div :key="state.currentQuestion.id">
          <p class="question hover-translate" :data-tooltip="state.currentQuestion.question.en">
            <span
              :class="{ token: true, punctuation: token.value.match(/^[.,!?]$/), new: !learnedLemmaSet.has(token.value) }"
              v-for="token in state.questionTokens">{{ token.value }}</span>
          </p>
          <Choices :choices="state.choices" @correct="toNextQuestion" />
        </div>
      </div>
      <div v-else>
        <VQAEditor v-model="state.editingVQA" />
      </div>
    </template>

  </main>
</template>

<style scoped>
main {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.devbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
}

.exercise {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.question {
  font-size: 1.1rem;
  margin-top: 1rem;
  text-align: center;
}

.token:not(.punctuation):not(:first-child) {
  margin-left: 0.2rem;
}

.token.new {
  color: blue;
}
</style>
