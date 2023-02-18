<script setup lang="ts">
import type { MultipleChoiceExercise } from "~/lib/Exercise"
import Sprachdown from "~/components/Sprachdown.vue"
import Hints from "./Hints.vue"

type Choice = MultipleChoiceExercise["choices"][0]

const props = withDefaults(defineProps<{
  choices: Choice[]
  complete: boolean
  hint: string
}>(), {
  complete: false,
  hint: ""
})

const emit = defineEmits<{
  (e: "correct"): void
}>()

const { speech, effects, user } = useSprachyApp()

const choicesUl = ref<HTMLUListElement | null>(null)

const state = defineState({
  chosen: new Set<Choice>(),
  speechEnabled: false
})

watchEffect(() => {
  for (const choice of props.choices) {
    speech.preload({ from: "narrator", message: choice.text })
  }
})

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
  setTimeout(enableSpeech, 50)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})

async function choose(choice: Choice) {
  if (!props.complete) {
    state.chosen.add(choice)
    if (choice.correct) {
      effects.confetti.spawnAt(
        choicesUl.value!.children[props.choices.indexOf(choice)] as HTMLElement
      )
      emit("correct")
    }
  }
}

function onKeydown(ev: KeyboardEvent) {
  for (let i = 0; i < props.choices.length; i++) {
    const choice = props.choices[i]!
    if (ev.key === (i + 1).toString()) {
      choose(choice)
    }
  }
}

function enableSpeech() {
  state.speechEnabled = true
}

function speakChoice(choice: Choice) {
  if (user.enableSpeechSynthesis && state.speechEnabled) {
    speech.say({ from: "narrator", message: choice.text })
  }
}
</script>

<template>
  <ul class="choices" ref="choicesUl">
    <li v-if="hint != ''">
      <Hints :hint="hint" />
    </li>
    <li v-for="(choice, i) in choices" @mouseenter="speakChoice(choice)">
      <button :class="{
        'btn': true,
        'btn-light': true,
        'incorrect': state.chosen.has(choice) && !choice.correct,
        'correct': state.chosen.has(choice) && choice.correct,
      }" @click.prevent="choose(choice)">
        <span class="number">{{ i + 1 }}</span>
        <Sprachdown inline :source="choice.text" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
.choices {
  display: flex;
  padding: 0;
  margin: auto;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.choices li {
  border: 1px solid #ccc;
  list-style: none;
  display: flex;
}

.choices li button.correct {
  background-color: #dff0d8;
}

.choices li button.incorrect {
  background-color: #f2dede;
}
</style>
