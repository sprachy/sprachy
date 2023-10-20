<script lang="ts" setup>
import type { Dialogue, DialogueLineReading } from "~/lib/Dialogue"
import { preloadDialogueAssets } from "~/lib/preloading"

const linesRef = ref<HTMLDivElement[]>()

const props = withDefaults(defineProps<{
  dialogue: Dialogue
  staticMode?: boolean
}>(), { staticMode: false })

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  promptToBegin: true,
  lineIndex: 0,
  readyToComplete: props.staticMode,

  get visibleLines() {
    return props.dialogue.lines.slice(0, state.lineIndex + 1)
  },

  get currentLine() {
    return state.visibleLines[state.visibleLines.length - 1]!
  },

  get doingExercise() {
    return !state.readyToComplete && state.currentLine.type !== "reading"
  },

  get lineFlips() {
    // We want to flip the line orientation each time the
    // speaker changes
    let flip = false
    let prevFlippableLine: DialogueLineReading | null = null
    return props.dialogue.lines.map((line) => {
      if (line.type !== "reading" || line.from === "narrator") {
        return false
      } else {
        if (prevFlippableLine && prevFlippableLine.from !== line.from) {
          flip = !flip
        }
        prevFlippableLine = line
        return flip
      }
    })
  }
})

watch(
  () => props.dialogue,
  () => {
    preloadDialogueAssets(props.dialogue)
  },
  { immediate: true }
)

watchEffect(() => {
  state.lineIndex = props.staticMode ? props.dialogue.lines.length : 0
})

watchEffect(() => {
  if (speech.enabled) {
    for (const line of props.dialogue.lines) {
      if (line.type === "reading" && line.from && line.message) {
        speech.preload({ from: line.from, message: line.message })
      }
    }
  }
})

watchEffect(() => {
  if (state.visibleLines.length && !props.staticMode) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }
})

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !state.doingExercise) {
    continueStory()
  }
}

async function nextLine() {
  if (linesRef.value?.length) {
    // This is necessary for the window keydown event listener
    // to fire for the next line on firefox
    linesRef.value[linesRef.value.length - 1].querySelector("input")?.blur()
  }
  if (state.lineIndex < props.dialogue.lines.length - 1) {
    state.lineIndex += 1
  } else if (!state.readyToComplete) {
    state.readyToComplete = true
  }
}

function continueStory() {
  if (state.doingExercise) {
    // User needs to do the exercise first, pass
  } else {
    nextLine()
  }
}
</script>

<!-- in:fly={staticMode ? undefined : { y: 20, duration: 500 }} -->

<template>
  <div class="InteractiveDialogue">
    <div class="prompt" v-if="state.promptToBegin">
      <h1>{{ dialogue.title }}</h1>
      <button class="btn btn-success" @click="state.promptToBegin = false">
        Start dialogue
      </button>
    </div>
    <div class="lines" v-else>
      <div v-for="(line, i) in state.visibleLines" class="line" ref="linesRef">
        <template v-if="line.type === 'reading'">
          <!-- <SpecialLineMorph {staticMode} {line} flip={lineFlips[i]} /> -->
          <StoryLineReading :staticMode="staticMode" :line="line" :flip="state.lineFlips[i]" />

        </template>
        <template v-else-if="line.type === 'choice'">
          <StoryLineChoice :line="line" @correct="nextLine"
            :complete="state.readyToComplete || line !== state.currentLine" />
        </template>
      </div>
    </div>
    <button v-if="state.readyToComplete && !staticMode" class="btn btn-success mt-4 ms-4" @click="emit('complete')">
      Complete dialogue</button>
  </div>
</template>

<style scoped>
.InteractiveDialogue {
  margin: auto;
  max-width: 600px;
}

.InteractiveDialogue .line:not(:first-child) {
  margin-top: 1rem;
}

.InteractiveDialogue :global(strong) {
  color: rgb(28, 176, 246);
}

.prompt {
  width: fit-content;
  margin: auto;
}
</style>
