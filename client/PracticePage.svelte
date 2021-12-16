<script lang="ts">
  import _ from "lodash"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Story from "./Story.svelte"
  import sprachy from "./sprachy"

  export let slug: string | undefined
  let complete: boolean = false

  $: pattern = ((slug: string | undefined) => {
    const pattern = sprachy.app.patternsWithProgress.find(
      (p) => p.slug === slug
    )
    if (!pattern) {
      throw new NotFoundError()
    }
    return pattern
  })(slug)

  // $: level = pattern.progress?.item.srsLevel || 0

  // TODO progression
  $: story = pattern.stories[0]

  async function onCompleteStory() {
    complete = true
    const progressItem = await sprachy.api.recordReview(pattern!.id, true)
    if (progressItem) {
      sprachy.app.receiveProgressItem(progressItem)
    }
  }
</script>

<SiteLayout>
  {#if !story}
    No stories for this pattern yet! Let's write some~
  {:else if !complete}
    <header class="story-header">
      <h3>{pattern.title}</h3>
      <h3>Level 1</h3>
    </header>
    <Story {story} on:complete={onCompleteStory} />
  {:else}
    <p>Nice work! This pattern will become available for review in 4 hours.</p>
  {/if}
</SiteLayout>

<style lang="sass">
  .story-header
    margin-bottom: 2rem
    h3
      text-align: center
</style>
