<script lang="ts">
  import _ from "lodash"
  import { Link } from "svelte-navigator"
  import { NotFoundError } from "./GlobalErrorHandler"
  import SiteLayout from "./SiteLayout.svelte"
  import Sprachdown from "./Sprachdown.svelte"
  import sprachy from "./sprachy"
  import Timeago from "./Timeago.svelte"

  export let slug: string | undefined

  const pattern = sprachy.app.patternsAndProgress.find((p) => p.slug === slug)
  if (!pattern) {
    throw new NotFoundError()
  }
</script>

<SiteLayout title={pattern.title}>
  <div class="pattern">
    <h1>{pattern.title}</h1>
    <Sprachdown source={pattern.explanation} />

    {#if pattern.progress.levelableAt && pattern.progress.levelableAt > Date.now()}
      <p class="text-secondary">
        <em
          >Level {pattern.progress.srsLevel + 1} unlocks in <Timeago
            ts={pattern.progress.levelableAt}
          /></em
        >
      </p>
    {/if}
    {#if pattern.progress.readyToLevel}
      <Link to="/pattern/{pattern.slug}/practice" class="btn btn-primary">
        Practice: Level {pattern.progress.srsLevel + 1}
      </Link>
    {/if}
    {#each _.reverse(pattern.progress.completedLevels) as level}
      <Link to="/pattern/{pattern.slug}/practice/level/{level + 1}" class="btn btn-secondary">
        Practice: Level {level + 1}
      </Link>
    {/each}
  </div>
</SiteLayout>

<style lang="sass">
.pattern
  max-width: 800px
  font-size: 17px
  line-height: 28px

  // :global(.table)
  //   margin-top: 2.5rem
  //   margin-bottom: 1.5rem

  // :global(.dialogue)
  //   margin-top: 2rem
  //   margin-bottom: 1rem

  :global(strong)
    color: rgb(28, 176, 246)

  :global(.btn)
    margin-right: 0.5rem
</style>
