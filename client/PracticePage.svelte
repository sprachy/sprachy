<script lang="ts">
  import _ from "lodash"
  import type { Pattern, Exercise } from "../common/sprachdex"
  import { NotFoundError } from "./globalErrorHandling"
  import { userContext } from "./context"
  import type { SprachyApp } from "./app"
  import SiteLayout from "./SiteLayout.svelte"
  import FillblankCard from "./FillblankCard.svelte"

  const { app, api } = userContext()

  export let slug: string
  let exerciseIndex: number = 0
  let complete: boolean = false
  let mistakes: number = 0
  let exercises: Exercise[] = []
  let pattern: SprachyApp["patternsWithProgress"][0]

  $: exercise = exercises[exerciseIndex]!

  $: ((slug: string) => {
    pattern = app.patternsWithProgress.find((p) => p.slug === slug)!
    if (!pattern) {
      throw new NotFoundError()
    }

    exercises = pattern.exercises
    exerciseIndex = 0
    complete = false
    mistakes = 0
  })(slug)

  async function onAnswer(event: CustomEvent<{ correct: boolean }>) {
    if (!event.detail.correct) {
      mistakes += 1
      exercises.push(exercise)
      exercises.shift()
      return
    }

    if (exerciseIndex + 1 >= pattern!.exercises.length) {
      complete = true
      const progressItem = await api.recordReview(pattern!.id, mistakes === 0)
      if (progressItem) {
        app.receiveProgressItem(progressItem)
      }
    } else {
      exerciseIndex += 1
    }
  }
</script>

<SiteLayout>
  {#if !exercises.length}
    No exercises implemented for this pattern yet! Let's write some~
  {:else if !complete}
    <FillblankCard {exercise} on:answer={onAnswer} />
  {:else}
    <p>Nice work! This pattern will become available for review in 4 hours.</p>
  {/if}
</SiteLayout>
