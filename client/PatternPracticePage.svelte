<script lang="ts">
  import _ from "lodash"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Story from "./Story.svelte"
  import sprachy from "./sprachy"
  import Timeago from "./Timeago.svelte"
  import type { PatternAndProgress } from "./UserApp"
  import { onDestroy, onMount } from "svelte"

  export let slug: string | undefined
  export let level: number | undefined = undefined
  let complete: boolean = false
  let pattern: PatternAndProgress

  $: pattern = ((slug: string | undefined) => {
    const pattern = sprachy.app.patternsAndProgress.find((p) => p.slug === slug)
    if (!pattern) {
      throw new NotFoundError()
    }
    return pattern
  })(slug)

  $: storyLevel = level || pattern.progress.srsLevel + 1

  $: story = pattern.stories[storyLevel - 1]

  function leavingWarning(e: any) {
    var confirmationMessage =
      "It looks like you have been editing something. " +
      "If you leave before saving, your changes will be lost."

    ;(e || window.event).returnValue = confirmationMessage
    return confirmationMessage
  }

  onMount(() => {
    window.addEventListener("beforeunload", leavingWarning)
  })

  onDestroy(() => {
    window.removeEventListener("beforeunload", leavingWarning)
  })

  async function onCompleteStory() {
    window.removeEventListener("beforeunload", leavingWarning)
    const progressItem = await sprachy.api.completeLevel(pattern!.id, storyLevel)
    if (progressItem) {
      sprachy.app.receiveProgressItem(progressItem)
    }
    pattern = sprachy.app.patternsAndProgress.find((p) => p.slug === slug)!
    complete = true
  }
</script>

<SiteLayout fixedHeader>
  <div class="story-holder">
    {#if !pattern.stories.length}
      No stories for this pattern yet! Let's write some~
    {:else if !story}
      <p>You've completed all the stories for this pattern!</p>
    {:else if !complete}
      <header class="story-header">
        <h3>{pattern.title}</h3>
        <h3>Level {storyLevel}</h3>
      </header>
      <Story {story} on:complete={onCompleteStory} />
    {:else if pattern.progress.levelableAt}
      <p>
        Nice work! Level {storyLevel + 1} will become available in <Timeago
          ts={pattern.progress.levelableAt}
        />.
      </p>
    {:else}
      <p>Nice work! You've completed all available levels of {pattern.title}!</p>
    {/if}
  </div>
</SiteLayout>

<style lang="sass">
.story-holder
  padding-top: 30vh
  padding-bottom: 50vh

.story-header
  margin-bottom: 2rem
  h3
    text-align: center
</style>
