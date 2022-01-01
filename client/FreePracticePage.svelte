<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"
  import StoryLineFillblank from "./StoryLineFillblank.svelte"

  /**
   * If we go to general practice and we have a levelup ready, redirect
   * to the pattern practice page for levelup.
   */
  const pattern = sprachy.app.patternsReadyToLevel[0]

  if (pattern) navigate(`/pattern/${pattern.slug}/practice`, { replace: true })

  /** Otherwise, let's do some free practice! */
  let lines = _.shuffle(sprachy.app.allCompletedFillblanks)
  let lineIndex = 0

  $: line = lines[lineIndex]!

  function nextLine() {
    if (lineIndex >= lines.length - 1) {
      lineIndex = 0
      lines = _.shuffle(lines)
    } else {
      lineIndex += 1
    }
  }
</script>

<SiteLayout>
  {#if !line}
    <p>You haven't learned any patterns to practice yet!</p>
  {:else}
    <header class="practice-header">
      <h3>Free Practice</h3>
      <p class="text-secondary">
        There aren't any patterns ready to level yet. If you like, you can practice random exercises
        here.
      </p>
    </header>
    <div class="exercises">
      <StoryLineFillblank {line} on:correct={nextLine} />
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.practice-header
  margin-bottom: 2rem
  text-align: center

.exercises
  margin: auto
  max-width: 600px
</style>
