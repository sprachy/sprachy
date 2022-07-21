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

  import PatternLayout from "$lib/PatternLayout.svelte"
  import PublicPage from "$lib/PublicPage.svelte"
  import type { Pattern } from "$lib/Pattern"
  import FillblankAsExample from "$lib/FillblankAsExample.svelte"

  export let pattern: Pattern
</script>

<PublicPage
  title={pattern.title}
  canonicalPath={`/${pattern.slug}`}
  cardDesc={pattern.shortdesc}
>
  <PatternLayout {pattern} activeTab="examples">
    <article class="examples">
      <ul>
        {#each pattern.exercises as line}
          <li>
            <FillblankAsExample {line} {pattern} />
          </li>
        {/each}
      </ul>
    </article>
  </PatternLayout>
</PublicPage>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }
</style>
