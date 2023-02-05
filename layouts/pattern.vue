<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBook,
  faDumbbell,
  faComments,
  faList,
  faPlay,
} from "@fortawesome/free-solid-svg-icons"
import Sprachdown from "~/components/Sprachdown.vue"
import { sprachdex } from '~/lib/sprachdex'

const route = useRoute()

const pattern = sprachdex.publishedPatterns.find(
  (p) => p.slug === route.params.pattern
)

// definePageMeta({
//   pattern: pattern
// })

if (!pattern) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pattern not found",
  })
}

const state = reactive({
  get activeTab() {
    if (route.path.endsWith("/dialogue")) {
      return "dialogue"
    } else if (route.path.endsWith("/examples")) {
      return "examples"
    } else {
      return "explanation"
    }
  }
})
</script>

<template v-if="pattern">
  <SiteHeader />
  <div class="patternLayout">
    <aside class="sidebar">
      <h1>
        {{ pattern.title }}
        <small v-if="pattern.draft" class="text-danger fs-5">Draft</small>
      </h1>
      <Sprachdown inline :source="pattern.shortdesc" />
      <nav>
        <ul>
          <li :class="{ active: state.activeTab === 'dialogue' }">
            <NuxtLink :href="`/${pattern.slug}/dialogue`">
              <FontAwesomeIcon fixedWidth :icon="faComments" />
              Dialogue
            </NuxtLink>
          </li>
          <li :class="{ active: state.activeTab === 'explanation' }">
            <NuxtLink :href="`/${pattern.slug}`">
              <FontAwesomeIcon fixedWidth :icon="faBook" />
              Explanation
            </NuxtLink>
          </li>
          <li v-if="pattern.exercises.some((ex) => ex.type === 'fillblank')"
            :class="{ active: state.activeTab === 'examples' }" }>
            <NuxtLink :href="`/${pattern.slug}/examples`">
              <FontAwesomeIcon fixedWidth :icon="faList" />
              Examples
            </NuxtLink>
          </li>
        </ul>
        <hr />

        <NuxtLink class="btn btn-outline-primary w-100" :href="`/story/${pattern.slug}`">
          <FontAwesomeIcon fixedWidth :icon="faPlay" />
          Play dialogue
        </NuxtLink>
        <NuxtLink class="btn btn-outline-primary w-100" :href="`/${pattern.slug}/practice`">
          <FontAwesomeIcon fixedWidth :icon="faDumbbell" />
          Practice
        </NuxtLink>
      </nav>
    </aside>
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.patternLayout {
  --sidebar-width: 250px;
  --sidebar-spacing: 2rem;
  margin: auto;
  display: flex;
  max-width: calc(720px + var(--sidebar-width) * 2);
}

.inner {
  width: 100%;
  margin-top: calc(var(--site-header-height) + 1rem);
  margin-left: calc(var(--sidebar-spacing) + var(--sidebar-width));
  margin-right: calc(var(--sidebar-spacing) + var(--sidebar-width));
}

.sidebar {
  position: fixed;
  top: calc(var(--site-header-height) + 1rem);
  width: var(--sidebar-width);
  margin-right: var(--sidebar-spacing);
}

.sidebar:hover {
  opacity: 1;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li a {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: #333;
  text-align: left;
}

.sidebar li a :global(svg) {
  margin-right: 0.5rem;
}

.sidebar li.active a {
  background-color: var(--sprachy-primary);
  color: white;
}

.sidebar .btn {
  margin-bottom: 0.5rem;
}
</style>
