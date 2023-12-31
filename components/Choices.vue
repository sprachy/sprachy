<script setup lang="ts">
import type { Line } from "~/lib/Line"
import Sprachdown from "~/components/Sprachdown.vue"

type Choice = Line["choices"][0]

const props = withDefaults(defineProps<{
  responder?: string
  choices: Choice[]
  complete?: boolean
  muted?: boolean
}>(), {
  responder: "narrator",
  complete: false,
  muted: false
})

const emit = defineEmits<{
  (e: "correct"): void
  (e: "incorrect"): void
}>()

const choicesUl = ref<HTMLUListElement | null>(null)

const state = defineState({
  chosen: new Set<Choice>(),
})

watch(
  () => props.choices,
  () => {
    state.chosen.clear()
  }
)

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})

async function choose(choice: Choice) {
  if (!props.complete) {
    state.chosen.add(choice)
    if (choice.correct) {
      speakChoice(choice, true)
      effects.confetti.spawnAt(
        choicesUl.value!.children[props.choices.indexOf(choice)] as HTMLElement
      )
      emit("correct")
    } else {
      emit("incorrect")
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

async function speakChoice(choice: Choice, force: boolean = false) {
  if (!props.muted || force) {
    const audio = speech.tryGetCached({ from: props.responder, message: choice.text })

    if (audio && speech.currentlySaying?.audioContent !== audio) {
      speech.playAudioContent(audio)
    }
  }
}
</script>

<template>
  <ul class="choices" ref="choicesUl">
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
  margin-top: 1rem;
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

.choices li button {
  display: flex;
}

.choices li button.correct {
  background-color: #dff0d8;
}

.choices li button.incorrect {
  background-color: #f2dede;
}

span.number {
  margin-right: 0.25rem;
}
</style>
