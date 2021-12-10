<script lang="ts">
  import _ from "lodash"
  import { sprachdex } from "../common/sprachdex"
  import { NotFoundError } from "./globalErrorHandling"
  import SiteLayout from "./SiteLayout.svelte"

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
  <!-- <site-layout> -->
  <div class="pattern">
    <h1>{pattern.title}</h1>
    <!-- <sprachdown :content="pattern.explanation" /> -->
    <!-- <b-btn variant="primary" :to="`/pattern/${pattern.slug}/practice`">
      Practice
    </b-btn> -->
  </div>
  <!-- </site-layout> -->
</SiteLayout>

<style lang="sass" scoped>
.pattern
  max-width: 800px
  font-size: 16px
  line-height: 24px
</style>
