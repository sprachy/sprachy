<template>
  <site-layout>
    <b-form @submit.prevent="save" v-if="pattern">
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="pattern.title" required />
      </b-form-group>

      <b-form-group label="Slug" label-for="slug">
        <b-form-input
          id="slug"
          v-model="pattern.slug"
          required
          :disabled="automaticSlug"
        />
        <b-form-checkbox v-model="automaticSlug" class="mt-2">
          Generate from title
        </b-form-checkbox>
      </b-form-group>

      <b-form-group label="Explanation" label-for="explanation">
        <b-textarea id="explanation" v-model="pattern.explanation" required />
      </b-form-group>

      <div class="d-flex">
        <b-btn type="submit" variant="success" size="lg" :disabled="saving">
          Save pattern
        </b-btn>
        <b-btn
          variant="danger"
          size="lg"
          class="ml-auto"
          @click="deletePattern"
          :disabled="saving"
        >
          Delete pattern
        </b-btn>
      </div>
    </b-form>
  </site-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import slugify from 'slugify'

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
  automaticSlug: boolean = true

  async created() {
    if (this.patternId) {
      this.pattern = await this.$adminApi.getPattern(this.patternId)
      this.automaticSlug = this.pattern.slug === this.generatedSlug
    } else {
      this.pattern = {
        title: "",
        slug: "",
        explanation: "",
      }
    }
  }

  get generatedSlug() {
    return slugify(this.pattern?.title || "")
  }

  @Watch("automaticSlug")
  @Watch("generatedSlug")
  setGeneratedSlug() {
    if (!this.automaticSlug || !this.pattern) return
    this.pattern.slug = this.generatedSlug
  }

  async save() {
    this.saving = true
    try {
      if (this.patternId) {
        this.pattern = await this.$adminApi.updatePattern(
          this.patternId,
          this.pattern!
        )
      } else {
        const pattern = await this.$adminApi.createPattern(this.pattern!)
        await this.$app.navigateReplace(`/admin/patterns/${pattern.id}`)
      }
    } finally {
      this.saving = false
    }
  }

  async deletePattern() {
    if (window.confirm(`Really delete pattern ${this.pattern!.slug}?`)) {
      await this.$adminApi.deletePattern(this.patternId!)
      await this.$app.navigateReplace("/admin/patterns")
    }
  }
}
</script>

<style lang="sass">
.custom-checkbox > *
  cursor: pointer
</style>
