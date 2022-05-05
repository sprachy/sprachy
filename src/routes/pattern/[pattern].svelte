<script lang="ts" context="module">
  import { sprachdex } from "$lib/sprachdex"
  import type { Load } from "./[pattern]"

  export const load: Load = async ({ params }) => {
    const pattern = sprachdex.patternsIncludingDrafts.find(
      (p) => p.slug === params.pattern
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
  import _ from "lodash"
  import PublicPage from "$lib/PublicPage.svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import Timeago from "$lib/client/Timeago.svelte"
  import type { PatternDef } from "$lib/Pattern"
  import sprachy from "$lib/sprachy"
  const { patternsAndProgress } = sprachy.spa ?? {}

  export let pattern: PatternDef

  const progress = $patternsAndProgress?.find(
    (p) => p.id === pattern.id
  )?.progress
</script>

<PublicPage
  title={pattern.title}
  canonicalPath={`/pattern/${pattern.slug}`}
  cardDesc={pattern.shortdesc}
>
  <SiteLayout>
    <div class="pattern">
      <h1>
        {pattern.title}
        {#if pattern.draft}
          <small class="text-danger fs-5">Draft</small>
        {/if}
      </h1>
      <Sprachdown source={pattern.explanation} />

      {#if progress}
        {#if progress.levelableAt && progress.levelableAt > Date.now()}
          <p class="text-secondary">
            <em
              >Level {progress.srsLevel + 1} unlocks in <Timeago
                ts={progress.levelableAt}
              /></em
            >
          </p>
        {/if}
        <a
          sveltekit:prefetch
          href="/story/{pattern.slug}"
          class="btn btn-primary"
        >
          {#if progress.srsLevel === 0}
            Learn this pattern
          {:else}
            Dialogue exercise
          {/if}
        </a>
      {:else}
        <a
          sveltekit:prefetch
          href={`/signup?next=/story/${pattern.slug}`}
          class="btn btn-primary"
        >
          Sign up to learn this pattern
        </a>
      {/if}
    </div>
  </SiteLayout>
</PublicPage>

<style lang="sass">
.pattern
  max-width: 720px
  margin: auto
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

@media only screen and (max-width: 768px)
  .pattern :global(table)
    font-size: 90%
</style>
