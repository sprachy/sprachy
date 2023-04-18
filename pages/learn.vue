<script setup lang="ts">
import Choices from "~/components/Choices.vue"
import { uniq } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencil, faSave, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { VQATask } from "~/lib/VQATask"
import type { TaskDefVQA } from "@prisma/client"

const user = await getCurrentUser()
const allTasks = reactive(await api.getTasks())
const isDev = process.dev

const learnedLemmaSet = new Set(user!.learnedLemmas)

const savedQuestionId = localStorage.getItem("mlLastQuestionId")

let initialQuestionIndex = allTasks.findIndex(
  (q) => q.id.toString() === savedQuestionId
)
initialQuestionIndex = initialQuestionIndex === -1 ? 0 : initialQuestionIndex

const state = defineState({
  questionIndex: initialQuestionIndex,
  editingVQA: null as TaskDefVQA | null,
  questionsLoaded: new Set<string>(),

  get task() {
    return new VQATask(allTasks[this.questionIndex])
  },

  get loaded() {
    return this.questionsLoaded.has(this.task.id)
  },

  get nextTask() {
    const def = allTasks[this.questionIndex + 1]
    return def ? new VQATask(def) : null
  },
})

async function toNextTask() {
  const newLemmas = uniq(state.task.questionLemmas).filter(w => !learnedLemmaSet.has(w))
  if (newLemmas.length) {
    for (const lemma of newLemmas) {
      learnedLemmaSet.add(lemma)
    }
    api.reportProgress({
      learnedLemmas: newLemmas,
    })
  }
  state.questionIndex += 1
}

watch(() => state.task, () => {
  localStorage.setItem(
    "mlLastQuestionId",
    state.task.def.id.toString()
  )
  speech.say({ from: "narrator", message: state.task.questionDe })
})

onMounted(async () => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})

function onKeydown(ev: KeyboardEvent) {
  if (ev.key === "Backspace" && !state.editingVQA)
    deleteExercise()
}

async function gotoPrev() {
  state.questionIndex -= 1
}

async function toggleEditMode() {
  if (state.editingVQA) {
    allTasks[state.questionIndex] = state.editingVQA
    await api.dev.updateTask(state.editingVQA.id, state.editingVQA)
    state.editingVQA = null
  } else {
    state.editingVQA = { ...state.task.def }
  }
}

async function deleteExercise() {
  if (state.editingVQA) {
    state.editingVQA = null
  }
  const deletingQuestionId = state.task.def.id
  state.questionIndex += 1
  await api.dev.deleteTask(deletingQuestionId)
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
    <template v-if="!state.loaded">
      <LoadingIndicator />
    </template>
    <template v-else-if="state.task">
      <div v-if="!state.editingVQA" class="task">
        <NuxtImg :src="state.task.imgUrl" placeholder alt="Identify this" />
        <div :key="state.task.def.id">
          <p class="question hover-translate" :data-tooltip="state.task.questionEn">
            <span
              :class="{ token: true, punctuation: token.value.match(/^[.,!?]$/), new: !learnedLemmaSet.has(token.value) }"
              v-for="token in state.task.questionTokens">{{ token.value }}</span>
          </p>
          <Choices :choices="state.task.choices" @correct="toNextTask" />
        </div>
      </div>
      <div v-else>
        <VQAEditor v-model="state.editingVQA" />
      </div>
    </template>
    <template v-for="task in [state.task, state.nextTask]">
      <TaskPreloader v-if="task" :task="task" @loaded="state.questionsLoaded.add(task.id)" />
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

.task {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.task img {
  max-height: calc(100vh - 350px);
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
