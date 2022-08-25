<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import PublicPage from "$lib/PublicPage.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
  const { pattern } = data
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
