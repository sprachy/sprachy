<script lang="ts" setup>
import { flatten, shuffle } from "lodash"
import ExerciseView from "./ExerciseView.vue"
import LevelReport from "./LevelReport.vue"
import successImg from "~/assets/success.webp"
import type { LearnableReviews } from "~/composables/progressStore"

const props = defineProps<{
  learnable: LearnableReviews
}>()

const emit = defineEmits<{
  (e: "complete"): void
}>()

const { data: patterns } = await useAsyncData(`patterns/${props.learnable.patterns.map(p => p.id).join(',')}}`,
  () => sprachdex.fetchPatterns({
    id: {
      $in: props.learnable.patterns.map(p => p.id)
    }
  })
)

const state = defineState({
  startedReview: false,
  completedReview: false,
  showNext: false,
  experienceByPatternId: {} as { [patternId: string]: number },
  reviewIndex: 0,

  get patterns() {
    return patterns.value || []
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
    return state.reviews[state.reviewIndex]
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
  },
  { immediate: true }
)

watchEffect(() => {
  if (speech.enabled) {
    for (const review of state.reviews) {
      console.log(review)
      speech.preloadExercise(review.exercise)
    }
  }
})

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

<!-- <svelte:head>
  {#each reviews as review}
    {#if "image" in review.exercise}
      <link rel="preload" as="image" href={review.exercise.image} />
    {/if}
  {/each}
</svelte:head> -->

<template>
  <div class="practice">
    <template v-if="!state.startedReview">
      <h2>Review session</h2>
      <button class="btn btn-primary" @click="state.startedReview = true">Start review</button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
