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

      <b-form-group>
        <b-row class="explanationEditor">
          <b-col>
            <b-form-group label="Explanation" label-for="explanation">
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
      </b-form-group>

      <b-form-group>
        <h4>Exercises</h4>
        <div :key="i" v-for="(exercise, i) in pattern.exercises">
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
      </b-form-group>
      <b-btn @click="addExercise">Add Exercise</b-btn>

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

<style lang="sass">
.custom-checkbox > *
  cursor: pointer

form
  margin-bottom: 3rem

.explanationEditor
  .form-group
    height: 100%
    min-height: 200px
    display: flex
    flex-direction: column

    > div
      flex-grow: 1
      
    > div > textarea, .card
      height: 100%
</style>
