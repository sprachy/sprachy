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

  import Sprachdown from "$lib/Sprachdown.svelte"
  import type { Pattern } from "$lib/Pattern"
  import PublicPage from "$lib/PublicPage.svelte"

  export let pattern: Pattern
</script>

<PublicPage
  title={pattern.title}
  canonicalPath={`/${pattern.slug}`}
  cardDesc={pattern.shortdesc}
>
  <article class="explanation">
    <Sprachdown source={pattern.explanation} />
  </article>
</PublicPage>

<style>
  .explanation {
    font-size: 17px;
    line-height: 28px;
  }

  .explanation :global(strong) {
    color: rgb(28, 176, 246);
  }

  .explanation :global(.btn) {
    margin-right: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    .explanation :global(table) {
      font-size: 90%;
    }
  }
</style>
