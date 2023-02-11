<script setup lang="ts">
import _ from "lodash"
import type { Story, ReadingLine } from "~/lib/Pattern"
import StoryLineReading from "~/components/StoryLineReading.vue"
import StoryLineChoice from "~/components/StoryLineChoice.vue"
import SpecialLineMorph from "~/components/SpecialLineMorph.vue"
import type { Ref } from "vue"

const { speech, user } = useSprachyApp()

const props = defineProps<{
  story: Story
  staticMode?: boolean
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const lineRef = ref(null) as Ref<HTMLDivElement | null>

const state = useLocalReactive({
  lineIndex: 0,
  readyToComplete: props.staticMode ? true : false,

  get visibleLines() {
    return props.story.slice(0, state.lineIndex + 1)
  },

  get currentLine() {
    return state.visibleLines[state.visibleLines.length - 1]!
  },

  get doingExercise() {
    return !state.readyToComplete && state.currentLine.type !== "reading"
  },

  // We want to flip the line orientation each time the
  // speaker changes
  get lineFlips() {
    let flip = false
    let prevFlippableLine: ReadingLine | null = null
    return props.story.map((line) => {
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
  },
})

watchEffect(() => {
  state.lineIndex = props.staticMode ? props.story.length : 0
})

watchEffect(() => {
  if (speech && user?.enableSpeechSynthesis) {
    for (const line of props.story) {
      if (line.type === "reading" && line.from && line.message) {
        speech.preload({ from: line.from, message: line.message })
      }
    }
  }
})

watchEffect(() => {
  if (lineRef.value && !props.staticMode) {
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
  if (lineRef.value) {
    // This is necessary for the window keydown event listener
    // to fire for the next line on firefox
    lineRef.value.querySelector("input")?.blur()
  }
  if (state.lineIndex < props.story.length - 1) {
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

<template>
  <div class="Story">
    <div class="lines">
      <!-- in:fly={staticMode ? undefined : { y: 20, duration: 500 }} -->
      <div v-for="(line, i) in state.visibleLines" class="line" ref="lineRef">
        <template v-if="line.type === 'reading'">
          <SpecialLineMorph v-if="line.special === 'morph'" :staticMode="props.staticMode" :line="line"
            :flip="state.lineFlips[i]" />
          <StoryLineReading v-else :staticMode="staticMode" :line="line" :flip="state.lineFlips[i]" />
        </template>
        <StoryLineChoice v-else-if="line.type === 'choice'" :line="line" @correct="nextLine"
          :complete="state.readyToComplete || line !== state.currentLine" />
      </div>
    </div>
    <button v-if="state.readyToComplete && !props.staticMode" class="btn btn-success mt-4 ms-4"
      @click="emit('complete')">Complete dialogue</button>
  </div>
</template>

<style scoped>
.Story {
  margin: auto;
  max-width: 600px;
}

.Story .line:not(:first-child) {
  margin-top: 1rem;
}

.Story strong {
  color: rgb(28, 176, 246);
}
</style>
