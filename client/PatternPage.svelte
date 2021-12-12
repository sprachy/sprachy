<script lang="ts">
  import _ from "lodash"
  import { Link } from "svelte-navigator"
  import { sprachdex } from "../common/sprachdex"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Sprachdown from "./Sprachdown.svelte"

  export let slug: string

  const pattern = sprachdex.allPatterns.find((p) => p.slug === slug)
  if (!pattern) {
    throw new NotFoundError()
  }
</script>

<SiteLayout title={pattern.title}>
  <div class="pattern">
    <h1>{pattern.title}</h1>
    <Sprachdown source={pattern.explanation} />
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
