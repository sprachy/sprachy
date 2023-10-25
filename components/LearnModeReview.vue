<script lang="ts" setup>
import { flatten, shuffle } from "lodash-es"
import ExerciseView from "./ExerciseView.vue"
import LevelReport from "./LevelReport.vue"
import successImg from "~/assets/success.webp"
import type { LearnableReviews } from "~/composables/progressStore"
import { preloadExerciseAssets } from "~/lib/preloading"

const props = defineProps<{
  learnable: Required<LearnableReviews>
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  startedReview: false,
  completedReview: false,
  showNext: false,
  experienceByPatternId: {} as { [patternId: string]: number },
  reviewIndex: 0,

  get patterns() {
    return props.learnable.data
  },

  get reviews() {
    return shuffle(
      flatten(
        this.patterns.map((p) =>
          p.exercises.map((ex) => ({ pattern: p, exercise: ex }))
        )
      )
    )
  },

  get review() {
    return state.reviews[state.reviewIndex]!
  },
})

watch(
  () => props.learnable,
  () => {
    state.startedReview = false
    state.completedReview = false
    state.showNext = false
    state.experienceByPatternId = {}
    state.reviewIndex = 0
    preloadExerciseAssets(state.reviews.map(r => r.exercise))
  },
  { immediate: true }
)

function nextExercise() {
  // Completed an exercise, gain experience
  progressStore.gainPatternExperience(state.review.pattern.id, 200)

  if (!(state.review.pattern.id in state.experienceByPatternId)) {
    state.experienceByPatternId[state.review.pattern.id] = 0
  }
  state.experienceByPatternId[state.review.pattern.id] += 200

  if (state.reviewIndex >= state.reviews.length - 1) {
    state.completedReview = true
  } else {
    state.reviewIndex += 1
  }
}

</script>

<template>
  <div class="practice">
    <template v-if="!state.startedReview">
      <div class="d-flex justify-content-center">
        <div>
          <h2>Review session</h2>
          <button class="btn btn-primary" @click="state.startedReview = true">Start review</button>
        </div>
      </div>
    </template>
    <template v-else-if="state.completedReview">
      <div class="complete">
        <div>
          <img :src="successImg" alt="Happy squirrel" />
        </div>
        <div>
          <h4>Review complete!</h4>
          <LevelReport :experienceByPatternId="state.experienceByPatternId" @animEnd="state.showNext = true" />
          <button class="btn btn-primary mt-2" @click="emit('complete')"
            :class="{ opacity: state.showNext ? 1 : 0 }">Continue</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="exercises">
        <ExerciseView :exercise="state.review.exercise" :pattern="state.review.pattern" @correct="nextExercise" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.practice {
  height: 100%;
  padding: 2rem 0;
}

.complete {
  margin: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 2rem;
}

.complete>div:last-child {
  flex-grow: 1;
}
</style>
