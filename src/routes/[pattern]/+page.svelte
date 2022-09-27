<script lang="ts">
  import _ from "lodash"
  import PatternExplanation from "$lib/PatternExplanation.svelte"
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
  <PatternExplanation {pattern} />
</PublicPage>
