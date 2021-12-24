<script lang="ts">
  import _ from "lodash"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Story from "./Story.svelte"
  import sprachy from "./sprachy"
  import Timeago from "./Timeago.svelte"

  export let slug: string | undefined
  export let level: number | undefined = undefined
  let complete: boolean = false

  console.log(level)

  $: pattern = ((slug: string | undefined) => {
    const pattern = sprachy.app.patternsAndProgress.find((p) => p.slug === slug)
    if (!pattern) {
      throw new NotFoundError()
    }
    return pattern
  })(slug)

  $: srsLevel = level ? level - 1 : pattern.progress.srsLevel

  $: story = pattern.stories[srsLevel]

  async function onCompleteStory() {
    const progressItem = await sprachy.api.recordReview(pattern!.id, true)
    if (progressItem) {
      sprachy.app.receiveProgressItem(progressItem)
    }
    complete = true
  }
</script>

<SiteLayout>
  {#if !pattern.stories.length}
    No stories for this pattern yet! Let's write some~
  {:else if !story}
    <p>You've completed all the stories for this pattern!</p>
  {:else if !complete}
    <header class="story-header">
      <h3>{pattern.title}</h3>
      <h3>Level {srsLevel + 1}</h3>
    </header>
    <Story {story} on:complete={onCompleteStory} />
  {:else if pattern.progress.levelableAt}
    <p>
      Nice work! Level {pattern.progress.srsLevel + 1} will become available for review in <Timeago
        ts={pattern.progress.levelableAt}
      />.
    </p>
  {:else}
    <p>Nice work! You've completed all available levels of {pattern.title}!</p>
  {/if}
</SiteLayout>

<style lang="sass">
  .story-header
    margin-bottom: 2rem
    h3
      text-align: center
</style>
