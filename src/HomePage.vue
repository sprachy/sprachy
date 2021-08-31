<template>
  <site-layout>
    <main class="container">
      Vokabon is a thingy for learning German with patterns!
      <ul>
        <li v-for="pattern in patterns" :key="pattern.name">
          {{ pattern.name }}
        </li>
      </ul>
    </main>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"

import patterns from '../patterns/a1'

@Component({
  components: {},
})
export default class HomePage extends Vue {
  get patterns() {
    return patterns
  }
}
</script>

<style lang="sass">
</style>
