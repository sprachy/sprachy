<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import PracticeSession from "$lib/client/PracticeSession.svelte"
  import type { PageData } from "./$types"
  import PageStyling from "$lib/PageStyling.svelte"

  export let data: PageData
  const { patternId } = data

  const spa = sprachy.expectSPA()
  const { patternsAndProgress } = spa

  $: pattern = $patternsAndProgress.find((p) => p.id === patternId)!

  $: exercises = pattern.exercises.map((ex) => ({
    ...ex,
    pattern,
  }))
</script>

<PageStyling hideHeader />

<PracticeSession {exercises} returnUrl={`/${pattern.slug}`} />
