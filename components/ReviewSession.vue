<script setup lang="ts">
import { flatten, shuffle } from "lodash"
import ExerciseView from "~/components/ExerciseView.vue"
import type { Pattern } from "~/lib/Pattern"
import LevelReport from "~/components/LevelReport.vue"
import successImg from "~/assets/success.webp"

const spa = useSprachyApp()
const { user, speech } = spa

const props = defineProps<{
  patterns: Pattern[]
}>()

const state = defineState({
  startedReview: false,
  completedReview: false,
  showNext: false,
  experienceByPatternId: {} as { [id: string]: number },
  reviews: [] as {
    pattern: Pattern
    exercise: Pattern["exercises"][number]
  }[],
  reviewIndex: 0,

  get review() {
    return state.reviews[state.reviewIndex]
  }
})

watchEffect(() => {
  state.reviews = shuffle(
    flatten(
      props.patterns.map((p) =>
        p.exercises.map((ex) => ({ pattern: p, exercise: ex }))
      )
    )
  )
})

watchEffect(() => {
  if (user.enableSpeechSynthesis) {
    for (const review of state.reviews) {
      speech.preloadExercise(review.exercise)
    }
  }
})

async function nextExercise() {
  const { review, reviews, reviewIndex, experienceByPatternId } = state
  // Completed an exercise, gain experience
  spa.gainPatternExperience(review.pattern.id, 200)

  if (!(review.pattern.id in experienceByPatternId)) {
    experienceByPatternId[review.pattern.id] = 0
  }
  experienceByPatternId[review.pattern.id] += 200

  if (reviewIndex >= reviews.length - 1) {
    state.completedReview = true
  } else {
    state.reviewIndex += 1
  }
}

async function finish() {
  spa.recalcCurrentLearning()
}
</script>

<template>
  <Head>
    <template v-for="review in state.reviews">
      <Link v-if="'image' in review.exercise" rel="preload" as="image" :href="review.exercise.image" />
    </template>
  </Head>

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
          <button class="btn btn-primary mt-2" @click.prevent="finish"
            :style="{ opacity: state.showNext ? 1 : 0 }">Continue</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="exercises">
        <ExerciseView :key="state.reviewIndex" :pattern="state.review.pattern" :exercise="state.review.exercise"
          @correct="nextExercise" />
      </div>
    </template>
  </div>
</template>

<style>
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
