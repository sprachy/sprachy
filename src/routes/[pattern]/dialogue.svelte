<script lang="ts" context="module">
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
        pattern: pattern,
      },
    }
  }
</script>

<script lang="ts">
  import _ from "lodash"

  import type { Pattern } from "$lib/Pattern"
  import PatternLayout from "$lib/PatternLayout.svelte"
  import Story from "$lib/Story.svelte"

  export let pattern: Pattern
</script>

<PatternLayout {pattern} activeTab="dialogue">
  <article class="dialogue">
    <Story staticMode story={pattern.story} />
  </article>
</PatternLayout>

<style>
</style>
