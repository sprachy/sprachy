<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const props = defineProps<{
  modelValue: PartialVQA
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: PartialVQA): void
}>()

const vqa = reactive({
  ...props.modelValue,
  question: {
    de: props.modelValue.question.de || "",
    en: props.modelValue.question.en || ""
  },
  choices: props.modelValue.choices || [
    { de: "", en: "", correct: false },
    { de: "", en: "", correct: false },
    { de: "", en: "", correct: false },
    { de: "", en: "", correct: false }
  ]
})

const state = defineState({
  get imgUrl() {
    return `/val2014/COCO_val2014_${vqa.imageId
      .toString()
      .padStart(12, "0")}.jpg`
  },

  get updatedVQA() {
    return JSON.parse(JSON.stringify(vqa))
  }
})

watch(
  () => state.updatedVQA,
  v => emit('update:modelValue', v)
)

function setCorrect(choice: CompleteVQA['choices'][number]) {
  for (const c of vqa.choices) {
    c.correct = false
  }
  choice.correct = true
}
</script>

<template>
  <div class="vqa-editor">
    <img :src="state.imgUrl" alt="Identify this" />
    <form @submit.prevent="() => null">
      <div class="question">
        <input class="form-control" type="text" v-model="vqa.question.de" />
        <input class="form-control" type="text" v-model="vqa.question.en" />
      </div>
      <ul class="choices">
        <li v-for="(choice, i) in vqa.choices" :key="i">
          <div>
            <input class="form-control" type="text" v-model="choice.de" />
            <input class="form-control" type="text" v-model="choice.en" />
          </div>
          <div>
            <button :class="['btn s-btn-faded', { correct: choice.correct }]" @click="setCorrect(choice)">
              <FontAwesomeIcon :icon="faCheck" size="lg" />
            </button>
            <button class="btn s-btn-faded" @click="vqa.choices.splice(i, 1)">
              <FontAwesomeIcon :icon="faTrash" />
            </button>
          </div>
        </li>
        <li>
          <button class="btn s-btn-faded" @click="vqa.choices.push({ de: '', en: '', correct: false })">
            <FontAwesomeIcon :icon="faPlus" size="lg" />
          </button>
        </li>
      </ul>
    </form>
  </div>
</template>

<style scoped>
.question {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

ul.choices {
  list-style-type: none;
  padding: 0;
  display: flex;
  margin: auto;
  max-width: 800px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

ul.choices li {
  display: inline;
}

ul.choices li input {
  width: 100px;
}

ul.choices li button.correct {
  color: darkgreen;
  opacity: 1;
}

ul.choices li button:not(.correct) {
  opacity: 0.2;
}
</style>
