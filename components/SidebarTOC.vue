<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faBook,
} from "@fortawesome/free-solid-svg-icons"
</script>

<template>
  <ul class="steps">
    <template v-for="pattern in progressStore.progressablePatterns" :key="pattern.id">
      <li :class="{ step: true, complete: pattern.progress.level > 0 }">
        <NuxtLink :href="`/${pattern.slug}`">
          <div class="marker">
            <FontAwesomeIcon :icon="faBook" size="sm" />
          </div>
          {{ pattern.title }}
        </NuxtLink>
      </li>
      <li
        class="step"
        v-if="progressStore.currentLearnable?.type === 'review' && pattern.id === progressStore.furthestLearnedPattern?.id">
        <NuxtLink href="/review">Review</NuxtLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.steps {
  padding: 0;
  margin: 0;
}

.step>a {
  display: flex;
  color: #333;
  text-decoration: none;
}

.step {
  list-style: none;
  display: flex;
  position: relative;
}

.step .text {
  padding-left: 10px;
}

.marker {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  min-width: 24px;
  height: 24px;
  padding-bottom: 2px;
  border-radius: 50%;
  background-color: #eaf0f4;
  font-size: 90%;
  margin-right: 0.3rem;
}

.step {
  padding-top: 15px;
}

.step>a:hover {
  text-decoration: underline;
}

.step.complete .step-title {
  color: #28a745;
}

.step.complete .marker,
.step.complete:not(.last-complete) .marker:after {
  background: #28a745 !important;
  color: white;
}

.step.last-complete .marker:after {
  background: #55bdeb !important;
}

.step.current .marker {
  background: #55bdeb;
  color: white;
}

.step.current .step-title {
  color: #55bdeb;
  margin-bottom: 1em;
}

.step:first-child {
  margin-top: -15px;
}

.step:not(:last-child) .marker:after {
  content: "";
  display: block;
  position: absolute;
  z-index: -10;
  right: auto;
  top: 39px;
  width: 4px;
  height: calc(100% - 24px);
  background-color: #eaf0f4;
}
</style>
