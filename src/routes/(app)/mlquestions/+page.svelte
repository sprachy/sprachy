<script lang="ts">
  import mlquestions from "$lib/mlquestions.json"
  import Choices from "$lib/Choices.svelte"
  import { flatten, range, sampleSize, shuffle, uniq } from "lodash"
  import sprachy from "$lib/sprachy"
  import { onMount } from "svelte"

  const { api, speech } = sprachy.expectSPA()

  const originalQuestions = mlquestions

  let currentQuestion = originalQuestions[0]!
  let nextQuestion = originalQuestions[1]!

  const savedImageId = localStorage.getItem("mlLastQuestionId")

  let nextQuestionIndex = originalQuestions.findIndex(
    (q) => q.imageId.toString() === savedImageId
  )
  nextQuestionIndex = nextQuestionIndex === -1 ? 0 : nextQuestionIndex
  $: nextUntranslatedQuestion = originalQuestions[nextQuestionIndex]!

  $: allPossibleAnswers = uniq(flatten(originalQuestions.map((q) => q.choices)))

  $: choices = currentQuestion.choices.map((choice) => ({
    text: choice,
    correct: choice === currentQuestion.answer,
  }))

  $: imgUrl = `val2014/COCO_val2014_${currentQuestion.imageId
    .toString()
    .padStart(12, "0")}.jpg`

  function toNextQuestion() {
    currentQuestion = nextQuestion
    speech.say({ from: "narrator", message: currentQuestion.question })
    prepareNext()
  }

  async function prepareNext() {
    const enAnswer = nextUntranslatedQuestion.answer

    let untranslatedChoices = [enAnswer]

    if (enAnswer === "yes") {
      untranslatedChoices = ["yes", "no"]
    } else if (enAnswer === "no") {
      untranslatedChoices = ["no", "yes"]
    } else if (enAnswer.match(/^[0-9]+$/)) {
      for (let i = 0; i < 3; i++) {
        untranslatedChoices.push(
          (parseInt(enAnswer) + Math.floor(Math.random() * 100)).toString()
        )
      }
    } else if (untranslatedChoices.length < 4) {
      untranslatedChoices.push(
        ...sampleSize(
          allPossibleAnswers.filter((a) => !untranslatedChoices.includes(a)),
          4 - untranslatedChoices.length
        )
      )
    }

    const { translations } = await api.http.post(`/api/translate`, {
      from: "en",
      to: "de",
      texts: [nextUntranslatedQuestion.question, ...untranslatedChoices],
    })

    for (let i = 0; i < translations.length; i++) {
      if (translations[i] === "Jawohl") {
        translations[i] = "ja"
      }
    }

    const [text, answer, ...wrongChoices] = translations

    nextQuestion = {
      imageId: nextUntranslatedQuestion.imageId,
      question: text,
      choices: shuffle([answer, ...wrongChoices]),
      answer: answer,
    }

    nextQuestionIndex += 1
    localStorage.setItem("mlLastQuestionId", nextQuestion.imageId.toString())
    speech.preload({
      from: "narrator",
      message: nextQuestion.question,
    })
    for (const choice of nextQuestion.choices) {
      speech.preload({
        from: "narrator",
        message: choice,
      })
    }
  }

  onMount(async () => {
    await prepareNext()
    toNextQuestion()
  })
</script>

<main>
  {#if currentQuestion}
    <div>
      <img src={imgUrl} alt="Identify this" />
      {#key currentQuestion.question}
        <p>{currentQuestion.question}</p>
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
