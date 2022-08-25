<script lang="ts">
  import _ from "lodash"

  import PublicPage from "$lib/PublicPage.svelte"
  import FillblankAsExample from "$lib/FillblankAsExample.svelte"

  import { page } from "$app/stores"
  import type { Pattern } from "$lib/Pattern"

  // TODO work out how to typescript this correctly
  $: pattern = ($page.stuff as any).pattern as Pattern
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
