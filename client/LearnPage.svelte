<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  const pattern = sprachy.app.nextPatternToLearn
  if (pattern) {
    navigate(`/pattern/${pattern.slug}`, { replace: true })
  }
</script>

<SiteLayout>
  <p>You've learned all available patterns, congrats!</p>
</SiteLayout>
