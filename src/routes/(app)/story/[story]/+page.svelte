<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import Story from "$lib/Story.svelte"
  import successImg from "$lib/img/success.webp"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/environment"
  import LevelReport from "$lib/LevelReport.svelte"

  import { afterNavigate } from "$app/navigation"
  import FocusHeader from "$lib/FocusHeader.svelte"
  import type { PageData } from "./$types"
  import PageStyling from "$lib/PageStyling.svelte"

  const spa = sprachy.expectSPA()
  const { api, progressByPatternId, user } = spa

  export let data: PageData
  const { pattern } = data
  let complete: boolean = false

  // Browsers don't let you play audio immediately after page load, to
  // prevent people spamming you with it. So if this is the first page load
  // we put a button before showing the story.
  let initialPageInteraction = false
  $: readyForStory = !$user.enableSpeechSynthesis || initialPageInteraction

  let returnPath: string = `/${pattern.slug}/dialogue`
  afterNavigate((navigation) => {
    if (navigation?.from) {
      if (["/learn"].includes(navigation.from.url.pathname)) {
        returnPath = "/learn"
      }
      initialPageInteraction = true
    }
  })

  $: story = pattern.story
  $: progress = $progressByPatternId[pattern.id]!

  let showNext: boolean = false

  function leavingWarning(e: any) {
    var confirmationMessage =
      "It looks like you have been editing something. " +
      "If you leave before saving, your changes will be lost."

    ;(e || window.event).returnValue = confirmationMessage
    return confirmationMessage
  }

  onMount(() => {
    if (!dev) {
      window.addEventListener("beforeunload", leavingWarning)
    }
  })

  onDestroy(() => {
    if (!dev) {
      window.removeEventListener("beforeunload", leavingWarning)
    }
  })

  let experienceByPatternId = { [pattern.id]: 0 }

  async function onCompleteStory() {
    window.removeEventListener("beforeunload", leavingWarning)

    if (progress.experience < 1000) {
      experienceByPatternId[pattern.id] = 1000
      const progressItems = await api.gainExperience(experienceByPatternId)
      for (const item of progressItems) {
        spa.receiveProgressItem(item)
      }
    }
    complete = true

    setTimeout(() => {
      const btn = document.querySelector(".btn-primary")! as HTMLLinkElement
      if (btn) btn.focus()
    }, 0)
  }
</script>

<PageStyling hideHeader />

{#if !story}
  No stories for this pattern yet! Let's write some~
{:else if story && !complete}
  <div class="story-holder">
    <FocusHeader closeUrl={returnPath} />
    <header>
      <h3>{pattern.storyTitle}</h3>
    </header>
    {#if !readyForStory}
      <div class="text-center">
        <button
          class="btn btn-primary"
          on:click={() => (initialPageInteraction = true)}>Play Dialogue</button
        >
      </div>
    {:else}
      <Story {story} on:complete={onCompleteStory} />
    {/if}
  </div>
{:else if complete}
  <div class="complete">
    <div>
      <div>
        <img src={successImg} alt="Happy squirrel" />
      </div>
      <div>
        <h4>Dialogue complete</h4>
        <LevelReport
          {experienceByPatternId}
          on:animEnd={() => (showNext = true)}
        />
        <a
          data-sveltekit-prefetch
          style:opacity={showNext ? 1 : 0}
          class="btn btn-success mt-2"
          href={`/${pattern.slug}`}
          >Continue
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .context {
    position: fixed;
    left: 5vh;
    top: 5vh;
    display: flex;
    align-items: center;
  }

  header {
    margin-bottom: 2rem;
  }

  header h3 {
    text-align: center;
  }

  .story-holder {
    padding-top: 3rem;
    padding-bottom: calc(50vh - 5rem - 80px);
  }

  .complete {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .complete > div {
    margin: auto;
    margin-top: 50vh;
    transform: translateY(-50%);
    width: 100%;
    max-width: 800px;
    display: flex;
  }

  .complete > div > div:last-child {
    margin-left: 2rem;
    flex-grow: 1;
  }

  .complete .btn {
    transition: opacity 0.5s;
  }

  img {
    margin: auto;
  }
</style>
