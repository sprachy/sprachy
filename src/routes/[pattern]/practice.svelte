<script context="module" lang="ts">
  import { sprachdex } from "$lib/sprachdex"
  import type { Load } from "@sveltejs/kit"

  export const load: Load<{ pattern: string }> = async ({ params }) => {
    const pattern = sprachdex.patternsIncludingDrafts.find(
      (p) => p.slug === params.pattern
    )

    if (!pattern) {
      return { status: 404 }
    }

    return {
      status: 200,
      props: {
        patternId: pattern.id,
      },
    }
  }
</script>

<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import PracticeSession from "$lib/client/PracticeSession.svelte"

  export let patternId: string

  const spa = sprachy.expectSPA()
  const { patternsAndProgress } = spa

  $: pattern = $patternsAndProgress.find((p) => p.id === patternId)!

  $: exercises = pattern.exercises.map((ex) => ({
    ...ex,
    pattern,
  }))
</script>

<PracticeSession {exercises} returnUrl={`/${pattern.slug}`} />
