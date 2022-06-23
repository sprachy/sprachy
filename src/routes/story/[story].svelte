<script lang="ts" context="module">
  import { sprachdex } from "$lib/sprachdex"
  import type { Load } from "@sveltejs/kit"

  export const load: Load<{ story: string }> = async ({ params }) => {
    const pattern = sprachdex.patternsIncludingDrafts.find(
      (p) => p.slug === params.story
    )

    if (!pattern) {
      return { status: 404 }
    }

    return {
      status: 200,
      props: {
        pattern: pattern,
      },
    }
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import Story from "$lib/client/Story.svelte"
  import Timeago from "$lib/client/Timeago.svelte"
  import successImg from "$lib/img/success.webp"
  import type { Pattern } from "$lib/Pattern"
  import type { PatternAndProgress } from "$lib/client/SprachyUserSPA"
  import { goto } from "$app/navigation"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/env"
  import LevelReport from "$lib/LevelReport.svelte"

  const spa = sprachy.expectSPA()
  const { api, patternAndProgressById, nextPatternToLearn } = spa

  export let pattern: Pattern
  let complete: boolean = false

  const story = pattern.story
  $: progress = $patternAndProgressById[pattern.id]!.progress
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

  async function onCompleteStory() {
    window.removeEventListener("beforeunload", leavingWarning)

    // if (progress.srsLevel > 0) {
    //   // User was practicing something they already did, just go back to the pattern page
    //   goto(`/${pattern.slug}`)
    // } else {
    const progressItem = await api.completeLevel(pattern.id, 1)
    if (progressItem) {
      spa.receiveProgressItem(progressItem)
    }
    complete = true

    setTimeout(() => {
      const btn = document.querySelector(".btn-primary")! as HTMLLinkElement
      btn.focus()
    }, 0)
    // }
  }
</script>

<SiteLayout fixedHeader>
  {#if !story}
    No stories for this pattern yet! Let's write some~
  {:else if story && !complete}
    <div class="story-holder">
      <header class="story-header">
        <h3>{pattern.title}</h3>
      </header>
      <Story {story} on:complete={onCompleteStory} />
    </div>
  {:else if complete}
    <div class="complete">
      <div>
        <img src={successImg} alt="Happy squirrel" />
      </div>
      <div>
        <h4>Introduction complete</h4>
        <LevelReport
          gains={[{ pattern, progress, experience: 1000 }]}
          on:animEnd={() => (showNext = true)}
        />
        <a
          sveltekit:prefetch
          style:opacity={showNext ? 1 : 0}
          class="btn btn-success mt-2"
          href={`/practice/${pattern.slug}`}
          >Continue to practice
        </a>
      </div>
    </div>
  {/if}
</SiteLayout>

<style>
  .story-holder {
    padding-top: 30vh;
    padding-bottom: calc(50vh - 5rem - 80px);
  }

  .story-header {
    margin-bottom: 2rem;
  }

  .story-header h3 {
    text-align: center;
  }

  .complete {
    margin: auto;
    margin-top: 50vh;
    transform: translateY(-50%);
    width: 100%;
    max-width: 800px;
    display: flex;
  }

  .complete > div:last-child {
    margin-left: 2rem;
    flex-grow: 1;
  }

  .complete .btn {
    transition: opacity 0.5s;
  }

  img {
    margin: auto;
  }

  p {
    font-size: 1.1rem;
  }
</style>
