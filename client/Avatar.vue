<template>
  <img class="avatar" :src="icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
// @ts-ignore
import lukas from "./img/lukas.png"
// @ts-ignore
import anna from "./img/anna.png"
// @ts-ignore
import squirrel from "./img/squirrel.png"
// @ts-ignore
import scientist from "./img/scientist.png"
// @ts-ignore
import deer from "./img/deer.png"

@Component
export default class Avatar extends Vue {
  @Prop({ type: String, required: true }) character!: string

  get icon() {
    return { lukas, anna, squirrel, scientist, deer }[this.character]
  }
}
</script>

<style lang="sass" scoped>
</style>