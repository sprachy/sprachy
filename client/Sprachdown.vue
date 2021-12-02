<template>
  <runtime-template-compiler :template="template" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
import { sprachdown } from "../common/sprachdown"
// @ts-ignore
import { RuntimeTemplateCompiler } from "vue-runtime-template-compiler"

@Component({
  components: {
    RuntimeTemplateCompiler,
  },
})
export default class Sprachdown extends Vue {
  @Prop({ type: String, required: true }) content!: string
  @Prop({ type: Boolean, default: false }) inline!: boolean

  get template() {
    if (this.inline) {
      return `<span>` + sprachdown.parseInline(this.content) + `</span>`
    } else {
      return `<div>` + sprachdown.parse(this.content) + `</div>`
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep .dline:not(:first-child)
  border-top: 0px
</style>
