<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  throw new Error("oh noes")

  const pattern = _.sortBy(
    sprachy.app.patternsWithProgress.filter((p) => p.progress),
    (p) => p.progress!.item.lastReviewedAt
  )[0]

  if (pattern) navigate(`/pattern/${pattern.slug}/practice`, { replace: true })
</script>

<SiteLayout>
  <p>No reviews yet!</p>
</SiteLayout>
