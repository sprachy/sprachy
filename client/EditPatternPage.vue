<template>
  <admin-layout>
    <b-form @submit.prevent="save" v-if="pattern">
      <section class="meta">
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
      </section>

      <section class="explanation">
        <b-row>
          <b-col>
            <b-form-group label="Explanation" label-for="explanation" description="Supports markdown">
              <b-textarea
                id="explanation"
                v-model="pattern.explanation"
                required
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Preview">
              <b-card>
                <div v-html="explanationPreview" />
              </b-card>
            </b-form-group>
          </b-col>
        </b-row>
      </section>

      <section class="exercises">
        <div class="exercise" :key="i" v-for="(exercise, i) in pattern.exercises">
          <h5>Exercise {{ i + 1 }}</h5>
          <b-row>
            <b-col>
              <b-form-group label="Deutsch" label-for="content">
                <b-input id="content" v-model="exercise.content" required />
              </b-form-group>

              <b-form-group label="English" label-for="translation">
                <b-input
                  id="translation"
                  v-model="exercise.translation"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Preview">
                <exercise-view :exercise="exercise" />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
  
        <b-btn @click="addExercise">Add Exercise</b-btn>
      </section>
  

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
  </admin-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import slugify from "slugify"
import type { Pattern } from "../common/api"
import ExerciseView from "./ExerciseView.vue"
import marked from "marked"

type EditingPattern = Omit<Pattern, "id">

@Component({
  components: {
    ExerciseView,
  },
})
export default class EditPatternPage extends Vue {
  @Prop({ type: String, default: null }) patternId!: string | null
  pattern: EditingPattern | null = null
  saving: boolean = false
  automaticSlug: boolean = true

  async created() {
    this.$debug.editPatternPage = this

    if (this.patternId) {
      this.pattern = await this.$adminApi.getPattern(this.patternId)
      if (!this.pattern.exercises) {
        this.$set(this.pattern, "exercises", [])
      }
      this.automaticSlug = this.pattern.slug === this.generatedSlug
    } else {
      this.pattern = {
        title: "",
        slug: "",
        explanation: "",
        exercises: [],
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

  addExercise() {
    this.pattern!.exercises.push({
      content: "",
      translation: "",
    })
  }

  get explanationPreview() {
    return marked(this.pattern!.explanation)
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

<style lang="sass" scoped>
.custom-checkbox > *
  cursor: pointer

form
  margin-bottom: 3rem

section
  margin-bottom: 2rem

section.explanation
  .form-group ::v-deep
    height: 100%
    min-height: 200px
    display: flex
    flex-direction: column

    > div
      display: flex
      flex-direction: column
      flex-grow: 1
      
    > div > textarea, .card
      flex-grow: 1

section.exercises
  .exercise
    margin-top: 1rem

</style>
