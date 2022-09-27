<script lang="ts">
  import _ from "lodash"

  import PublicPage from "$lib/PublicPage.svelte"
  import FillblankAsExample from "$lib/FillblankAsExample.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
  const { pattern } = data
</script>

<PublicPage
  title={pattern.title}
  canonicalPath={`/${pattern.slug}`}
  cardDesc={pattern.shortdesc}
>
  <article class="examples">
    <ul>
      {#each pattern.exercises as line}
        <li>
          <FillblankAsExample {line} />
        </li>
      {/each}
    </ul>
  </article>
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
