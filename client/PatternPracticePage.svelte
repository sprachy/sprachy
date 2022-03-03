<script lang="ts">
  import _ from "lodash"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Story from "./Story.svelte"
  import sprachy from "./sprachy"
  import Timeago from "./Timeago.svelte"
  import type { PatternAndProgress } from "./UserApp"
  import { onDestroy, onMount } from "svelte"
  import { Link, navigate } from "svelte-navigator"
  import successImg from "./img/success.jpg"

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

  let nextPattern: PatternAndProgress | undefined

  async function onCompleteStory() {
    window.removeEventListener("beforeunload", leavingWarning)

    if (storyLevel <= pattern.progress.srsLevel) {
      // User was practicing something they already did, just go back to the pattern page
      navigate(`/pattern/${pattern.slug}`)
    } else {
      const progressItem = await sprachy.api.completeLevel(pattern!.id, storyLevel)
      if (progressItem) {
        sprachy.app.receiveProgressItem(progressItem)
      }
      pattern = sprachy.app.patternsAndProgress.find((p) => p.slug === slug)!
      nextPattern = sprachy.app.nextPatternToLearn
      complete = true

      setTimeout(() => {
        const btn = document.querySelector(".btn-primary")! as HTMLLinkElement
        btn.focus()
      }, 0)
    }
  }
</script>

<SiteLayout fixedHeader>
  {#if !pattern.stories.length}
    No stories for this pattern yet! Let's write some~
  {:else if story && !complete}
    <div class="story-holder">
      <header class="story-header">
        <h3>{pattern.title}</h3>
        <h3>Level {storyLevel}</h3>
      </header>
      <Story {story} on:complete={onCompleteStory} />
    </div>
  {:else if pattern.progress.levelableAt}
    <div class="complete">
      <img src={successImg} alt="Happy squirrel" />
      <p>
        Nice work! Level {pattern.progress.srsLevel + 1} of {pattern.title} will become available
        <Timeago ts={pattern.progress.levelableAt} />.
      </p>
      {#if nextPattern}
        <Link class="btn btn-primary" to={`/pattern/${nextPattern.id}`}
          >Next: {nextPattern.title}
        </Link>
      {/if}
    </div>
  {:else}
    <div class="complete">
      <img src={successImg} alt="Happy squirrel" />
      <p>Nice work! You've completed all available levels of {pattern.title}!</p>
      {#if nextPattern}
        <Link class="btn btn-primary" to={`/pattern/${nextPattern.id}`}
          >Next: {nextPattern.title}
        </Link>
      {/if}
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.story-holder
  padding-top: 30vh
  padding-bottom: calc(50vh - 5rem - 80px)

.story-header
  margin-bottom: 2rem
  h3
    text-align: center

.complete
  padding-top: 20vh
  width: fit-content
  margin: auto
  text-align: center

  img
    margin: auto

  p
    font-size: 1.1rem
</style>
