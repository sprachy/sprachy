<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { userContext } from "./context"
  import SiteLayout from "./SiteLayout.svelte"
  const { app } = userContext()

  const pattern = app.nextPatternToLearn
  if (pattern) {
    navigate(`/pattern/${pattern.slug}`, { replace: true })
  }
</script>

<SiteLayout>
  <p>You've learned all available patterns, congrats!</p>
</SiteLayout>
