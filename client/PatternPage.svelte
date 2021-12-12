<script lang="ts">
  import _ from "lodash"
  import { Link } from "svelte-navigator"
  import { sprachdex } from "../common/sprachdex"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import SprachdownNode from "./SprachdownNode.svelte"
  import SvelteMarkdown from "svelte-markdown"

  export let slug: string

  function findPattern() {
    const pattern = sprachdex.allPatterns.find((p) => p.slug === slug)
    if (!pattern) {
      throw new NotFoundError()
    }
    return pattern
  }

  $: pattern = findPattern()
</script>

<svelte:head>
  <title>{pattern.title}</title>
</svelte:head>

<SiteLayout>
  <div class="pattern">
    <h1>{pattern.title}</h1>
    <SvelteMarkdown
      source={pattern.explanation}
      renderers={{ html: SprachdownNode }}
    />
    <!-- <sprachdown :content="pattern.explanation" /> -->
    <Link to="/pattern/{pattern.slug}/practice" class="btn btn-primary">
      Practice
    </Link>
  </div>
</SiteLayout>

<style lang="sass" scoped>
.pattern
  max-width: 800px
  font-size: 16px
  line-height: 24px
</style>
