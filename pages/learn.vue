<script setup lang="ts">
import LearnModeDialogue from "~/components/LearnModeDialogue.vue"
import LearnModeExercises from "~/components/LearnModeExercises.vue"
import LearnModeExplanation from "~/components/LearnModeExplanation.vue"
import LearnSidebar from "~/components/LearnSidebar.vue"
import ReviewSession from "~/components/ReviewSession.vue"


const spa = useSprachyApp()

if (!spa.learning) {
  spa.recalcCurrentLearning()
}

watch(() => spa.learning, () => {
  window.scrollTo(0, 0)
})

function nextLearning() {
  spa.recalcCurrentLearning()
}

function finishExplanation() {
  if (spa.learning?.type !== "pattern") return
  spa.learning.readExplanation = true
}
</script>

<template>
  <LearnSidebar v-if="spa.learning" />
  <div class="learnable">
    <template v-if="spa.learning" :key="spa.learning.why">
      <LearnModeDialogue v-if="spa.learning.type === 'dialogue'" :pattern="spa.learning.pattern"
        @complete="nextLearning" />
      <LearnModeExplanation v-else-if="spa.learning.type === 'pattern' && !spa.learning.readExplanation"
        @complete="finishExplanation" />
      <ReviewSession v-else-if="spa.learning.type === 'review'" :patterns="spa.learning.patterns" />
      <LearnModeExercises v-else :pattern="spa.learning.pattern" @complete="nextLearning" />
    </template>
    <template v-else>
      <p>You've already learned everything?! Congrats!</p>
    </template>
  </div>
</template>

<style>
.learnable {
  padding-top: 5rem;
  padding-left: 300px;
  height: 100%;
}
</style>
