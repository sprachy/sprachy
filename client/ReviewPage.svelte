<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { userContext } from "./context"
  import SiteLayout from "./SiteLayout.svelte"
  const { app } = userContext()

  const pattern = _.sortBy(
    app.patternsWithProgress.filter((p) => p.progress),
    (p) => p.progress!.item.lastReviewedAt
  )[0]

  if (pattern) navigate(`/pattern/${pattern.slug}/practice`, { replace: true })
</script>

<SiteLayout>
  <p>No reviews yet!</p>
</SiteLayout>
