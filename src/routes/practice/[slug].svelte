<script context="module" lang="ts">
  import { sprachdex } from "$lib/sprachdex"
  import type { Load } from "@sveltejs/kit"

  export const load: Load<{ slug: string }> = async ({ params }) => {
    const pattern = sprachdex.patternsIncludingDrafts.find(
      (p) => p.slug === params.slug
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
  import SiteLayout from "$lib/SiteLayout.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
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

<SiteLayout>
  <PracticeSession {exercises} />
</SiteLayout>

<style>
  .practice-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .exercises {
    margin: auto;
    max-width: 600px;
  }
</style>
