<template>
  <runtime-template-compiler :template="template" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"
import marked from "marked"
// @ts-ignore
import { RuntimeTemplateCompiler } from "vue-runtime-template-compiler"

@Component({
  components: {
    RuntimeTemplateCompiler,
  },
})
export default class Sprachdown extends Vue {
  @Prop({ type: String, required: true }) content!: string

  get template() {
    return `<div>` + marked(this.content) + `</div>`
  }
}
</script>

<style lang="sass" scoped>
::v-deep .dline:not(:first-child)
  border-top: 0px
</style>
