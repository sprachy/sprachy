<script lang="ts">
  import _ from "lodash";
  // import { Link } from "svelte-navigator";
  // import { NotFoundError } from "../$lib/client/GlobalErrorHandler";
  import SiteLayout from "$lib/SiteLayout.svelte";
  import Sprachdown from "$lib/Sprachdown.svelte";
  // import Timeago from "$lib/client/Timeago.svelte";
  import type { PatternDef } from "$lib/Pattern";

  export let pattern: PatternDef;
</script>

<SiteLayout title={pattern.title}>
  <div class="pattern">
    <h1>
      {pattern.title}
      {#if pattern.draft}
        <small class="text-danger fs-5">Draft</small>
      {/if}
    </h1>
    <Sprachdown source={pattern.explanation} />

    <!-- {#if pattern.progress.levelableAt && pattern.progress.levelableAt > Date.now()}
      <p class="text-secondary">
        <em
          >Level {pattern.progress.srsLevel + 1} unlocks in <Timeago
            ts={pattern.progress.levelableAt}
          /></em
        >
      </p>
    {/if}
    <Link to="/pattern/{pattern.slug}/story" class="btn btn-primary">
      {#if pattern.progress.srsLevel === 0}
        Learn this pattern
      {:else}
        Dialogue exercise
      {/if}
    </Link> -->
  </div>
</SiteLayout>

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
