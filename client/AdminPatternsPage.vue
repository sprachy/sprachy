<template>
  <admin-layout>
    <b-btn to="/admin/patterns/new">+ Add Pattern</b-btn>
    <b-table-simple class="mt-2">
      <b-thead>
        <b-tr>
          <b-th>Slug</b-th>
          <b-th>Name</b-th>
          <b-th>Explanation</b-th>
          <b-th>Status</b-th>
        </b-tr>
      </b-thead>
      <b-tr v-for="pattern in patterns" :key="pattern.name" @click="editPattern(pattern.id)">
        <td>{{ pattern.slug }}</td>
        <td>{{ pattern.title }}</td>
        <td>{{ pattern.explanation }}</td>
        <td>{{ pattern.published ? "Published" : "Draft" }}</td>
      </b-tr>
    </b-table-simple>
  </admin-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { Pattern } from "../common/api"

@Component({
  components: {},
})
export default class AdminPatternsPage extends Vue {
  patterns: Pattern[] = []

  async mounted() {
    this.patterns = await this.$api.admin.listPatterns()
  }

  async editPattern(patternId: number) {
    await this.$app.navigate(`/admin/patterns/${patternId}`)
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
