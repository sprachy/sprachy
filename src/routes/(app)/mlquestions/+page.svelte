<script lang="ts">
  import mlquestions from "$lib/mlquestions.json"
  import Choices from "$lib/Choices.svelte"
  import sprachy from "$lib/sprachy"
  import { onMount } from "svelte"

  const { api, speech } = sprachy.expectSPA()

  const questionsDataset = mlquestions

  const savedQuestionId = localStorage.getItem("mlLastQuestionId")

  let questionIndex = questionsDataset.findIndex(
    (q) => q.questionId.toString() === savedQuestionId
  )
  questionIndex = questionIndex === -1 ? 0 : questionIndex

  $: currentQuestion = questionsDataset[questionIndex]!

  $: choices = currentQuestion.choices.map((c) => ({
    text: c.de,
    correct: c.de === currentQuestion.answer.de,
  }))

  $: imgUrl = `val2014/COCO_val2014_${currentQuestion.imageId
    .toString()
    .padStart(12, "0")}.jpg`

  function toNextQuestion() {
    questionIndex += 1
  }

  $: if (currentQuestion) {
    localStorage.setItem(
      "mlLastQuestionId",
      currentQuestion.questionId.toString()
    )
    speech.say({ from: "narrator", message: currentQuestion.question.de })
  }

  async function prepareNext() {
    const nextQuestion = questionsDataset[questionIndex + 1]
    if (!nextQuestion) return

    speech.preload({
      from: "narrator",
      message: nextQuestion.question.de,
    })
    for (const choice of nextQuestion.choices) {
      speech.preload({
        from: "narrator",
        message: choice.de,
      })
    }
  }
</script>

<main>
  {#if currentQuestion}
    <div>
      <img src={imgUrl} alt="Identify this" />
      {#key currentQuestion.questionId}
        <p class="hover-translate" data-tooltip={currentQuestion.question.en}>
          {currentQuestion.question.de}
        </p>
        <Choices {choices} on:correct={toNextQuestion} />
      {/key}
    </div>
  {/if}
</main>

<style>
  main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  main > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
