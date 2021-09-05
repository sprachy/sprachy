<template>
  <site-layout>
    <b-form @submit.prevent="save">
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="pattern.title" required />
      </b-form-group>

      <b-form-group label="Slug" label-for="slug">
        <b-form-input id="slug" v-model="pattern.slug" required />
      </b-form-group>

      <b-form-group label="Explanation" label-for="explanation">
        <b-textarea id="explanation" v-model="pattern.explanation" required />
      </b-form-group>

      <b-btn type="submit" variant="success" size="lg" class="mb-3">
        <template v-if="patternId"> Save pattern </template>
        <template v-else> Create pattern </template>
      </b-btn>
    </b-form>
  </site-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import _ from "lodash"

type Pattern = {
  title: string
  slug: string
  explanation: string
}

@Component({
  components: {},
})
export default class EditPatternPage extends Vue {
  @Prop({ type: Number, default: null }) patternId!: number | null
  pattern: Pattern | null = null
  saving: boolean = false

  async created() {
    if (this.patternId) {
      this.pattern = await this.$adminApi.getPattern(this.patternId)
    } else {
      this.pattern = {
        title: "",
        slug: "",
        explanation: "",
      }
    }
  }

  async save() {
    if (!this.pattern) return

    this.saving = true
    try {
      if (this.patternId) {
        this.pattern = await this.$adminApi.updatePattern(
          this.patternId,
          this.pattern
        )
      } else {
        const pattern = await this.$adminApi.createPattern(this.pattern)
        await this.$app.navigateReplace(`/admin/patterns/${pattern.id}`)
      }
    } finally {
      this.saving = false
    }
  }
}
</script>

<style lang="sass">
</style>
