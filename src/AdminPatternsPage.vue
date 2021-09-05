<template>
  <site-layout>
    <b-btn to="/admin/patterns/new">+ Add Pattern</b-btn>
    <b-table-simple class="mt-2">
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
        </b-tr>
      </b-thead>
      <b-tr v-for="pattern in patterns" :key="pattern.name">
        <td>{{ pattern.name }}</td>
      </b-tr>
    </b-table-simple>
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import { Pattern } from "./api"

@Component({
  components: {},
})
export default class AdminPatternsPage extends Vue {
  patterns: Pattern[] = []

  async mounted() {
    this.patterns = await this.$adminApi.listPatterns()
  }
}
</script>

<style lang="sass">
</style>
