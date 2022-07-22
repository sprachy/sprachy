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
  import { faPlay } from "@fortawesome/free-solid-svg-icons"
  import Fa from "svelte-fa"

  export let pattern: Pattern
</script>

<PatternLayout {pattern} activeTab="dialogue">
  <article class="dialogue">
    <a
      class="btn btn-outline-primary mb-4"
      sveltekit:prefetch
      href="/story/{pattern.slug}"
    >
      <Fa fw icon={faPlay} />
      Play dialogue
    </a>

    <Story staticMode story={pattern.story} />
  </article>
</PatternLayout>

<style>
</style>
