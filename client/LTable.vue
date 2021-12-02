<template>
  <b-table-simple class="mt-2 ltable" bordered>
    <b-thead v-if="headerRow">
      <b-tr>
        <b-th v-for="(d, i) in headerRow" :key="i">
          {{ d }}
        </b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(row, i) in rows" :key="i">
        <b-td v-for="(d, j) in row" :key="j">
          <sprachdown inline :content="d" />
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
// @ts-ignore
import lukas from "./img/lukas.png"
// @ts-ignore
import anna from "./img/anna.png"
// @ts-ignore
import squirrel from "./img/squirrel.png"

@Component
export default class LTable extends Vue {
  @Prop({ type: String, default: null }) header!: string | null

  created() {
    this.$debug.ltable = this
  }

  get headerRow() {
    return this.header?.split(" / ")
  }

  get rows() {
    const text = this.$slots.default![0]!.text!
    const lines = text.trim().split("\n")
    return lines.map((l) => l.split(" / "))
  }
}
</script>

<style lang="sass" scoped>
.ltable
  th
    border-bottom: none
</style>
