<template>
  <site-layout>
    <b-btn @click="addPattern">+ Add Pattern</b-btn>
    <b-table-simple class="mt-2">
      <b-tr v-for="pattern in patterns" :key="pattern.name">
        <td>{{ pattern.name }}</td>
      </b-tr>
    </b-table-simple>
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

  addPattern() {
    this.$adminApi.createPattern()
  }
}
</script>

<style lang="sass">
</style>
