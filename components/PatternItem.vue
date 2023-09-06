<script setup lang="ts">
import type { Pattern } from "~/lib/Pattern"
import Sprachdown from "~/components/Sprachdown.vue"

const props = defineProps<{ pattern: Pattern }>()

// const progressByPatternId = sprachy.spa?.progressByPatternId
// const progress = $progressByPatternId
//   ? $progressByPatternId[pattern.id]
//   : null

// $: level = progress ? progress.level : 0
const progress = null
</script>

<template>
  <li class="pattern">
    <NuxtLink :href="`/pattern/${props.pattern.slug}`">
      <div class="pattern-inner">
        <div class="level-part">
          <!-- <div class="levelbar">
              {#each { length: 5 } as _, i}
              <div class:pip={true} class:filled={level>= i + 1} />
                {/each}
              </div>
              Lv. {level}
            </div> -->
          <div class="text-part">
            <h6>
              {{ props.pattern.title }}
            </h6>
            <div class="shortdesc">
              <Sprachdown inline :source="props.pattern.shortdesc" />
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<style scoped>
.pattern {
  --pattern-color: var(--sprachy-primary);
}

.pattern {
  display: flex;
  list-style-type: none;
  border-radius: 3px;
  padding: 0.5rem;
}

.pattern>a {
  display: block;
  background: #f5f5f6;
}

.pattern h6 {
  color: var(--pattern-color);
}

.pattern>a {
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  color: inherit;
  text-decoration: none;
  flex-grow: 1;
}

.pattern>a:hover h6 {
  text-decoration: underline;
}

.pattern h6 {
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
}

.pattern .shortdesc {
  margin-bottom: 0.1rem;
}

.pattern-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.text-part {
  flex-grow: 1;
}

.level-part {
  margin: 0 1rem;
  height: 100px;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  align-items: center;
  min-width: 35px;
  color: var(--pattern-color);
}

.levelbar {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  gap: 1px;
  width: 20px;
}

.levelbar .pip {
  flex-grow: 1;
  width: 100%;
  background: #e9ecef;
}

.levelbar .pip.filled {
  background: var(--pattern-color);
}
</style>
