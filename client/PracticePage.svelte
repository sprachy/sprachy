<script lang="ts">
  import _ from "lodash"
  import type { Exercise } from "../common/sprachdex"
  import { NotFoundError } from "./GlobalErrorHandler"
  import type { UserApp } from "./UserApp"
  import SiteLayout from "./SiteLayout.svelte"
  import FillblankCard from "./FillblankCard.svelte"
  import sprachy from "./sprachy"

  export let slug: string | undefined
  let exerciseIndex: number = 0
  let complete: boolean = false
  let mistakes: number = 0

  const pattern = sprachy.app.patternsWithProgress.find((p) => p.slug === slug)
  if (!pattern) {
    throw new NotFoundError()
  }

  let exercises: Exercise[] = pattern.exercises
  $: exercise = exercises[exerciseIndex]!

  async function onAnswer(event: CustomEvent<{ correct: boolean }>) {
    if (!event.detail.correct) {
      mistakes += 1
      exercises.push(exercise)
      exercises.shift()
      return
    }

    if (exerciseIndex + 1 >= pattern!.exercises.length) {
      complete = true
      const progressItem = await sprachy.api.recordReview(
        pattern!.id,
        mistakes === 0
      )
      if (progressItem) {
        sprachy.app.receiveProgressItem(progressItem)
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
