<script lang="ts" setup>
import type { Line } from "~/lib/Line"
import { preloadLineAssets } from "~/lib/preloading"

const linesRef = ref<HTMLDivElement[]>()

const props = withDefaults(defineProps<{
  lines: Line[]
  staticMode?: boolean
}>(), { staticMode: false })

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  promptToBegin: true,
  currentLineIndex: 0,

  get doingExercise() {
    return state.currentLine?.choices
  },

  get currentLine() {
    return props.lines[this.currentLineIndex]
  },

  get visibleLines() {
    return props.lines.slice(0, this.currentLineIndex + 1)
  },

  get lineFlips() {
    // We want to flip the line orientation each time the
    // speaker changes
    let flip = false
    let prevFlippableLine: Line | null = null
    return props.lines.map((line) => {
      if (!line.from || !line.message || line.from === "narrator") {
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
  () => props.lines,
  () => {
    preloadLineAssets(props.lines)
  },
  { immediate: true }
)

watch(
  () => [props.staticMode, props.lines],
  () => {
    state.currentLineIndex = props.staticMode ? props.lines.length - 1 : 0
  },
  { immediate: true }
)

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
    linesRef.value[linesRef.value.length - 1]?.querySelector("input")?.blur()
  }
  if (state.currentLineIndex < props.lines.length) {
    state.currentLineIndex += 1
  } else if (!state.currentLine) {
    emit("complete")
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
  <div class="lines">
    <div v-for="(line, i) in state.visibleLines" class="line" ref="linesRef">
      <LineView :key="i" :line="line" :flip="state.lineFlips[i]!" @correct="nextLine"
        :current="i === state.currentLineIndex"
        :complete="line !== state.currentLine" />
    </div>
  </div>
  <button v-if="!state.doingExercise" @click="nextLine" class="btn btn-success continueBtn">Continue</button>
</template>

<style scoped>
.lines {
  margin: auto;
  max-width: 600px;
}

.lines :global(strong) {
  color: rgb(28, 176, 246);
}

.prompt {
  width: fit-content;
  margin: auto;
}

.continueBtn {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
</style>
