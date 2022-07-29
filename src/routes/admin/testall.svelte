<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import { sprachdex } from "$lib/sprachdex"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import StoryLineFillblank from "$lib/client/StoryLineFillblank.svelte"
  import StoryLineReading from "$lib/client/StoryLineReading.svelte"
  import StoryLineChoice from "$lib/client/StoryLineChoice.svelte"

  const patterns = sprachdex.publishedPatterns
</script>

<SiteLayout>
  <h1>Testall</h1>
  {#each patterns as pattern}
    <div class="pattern">
      <h1>{pattern.title}</h1>
      <Sprachdown source={pattern.explanation} />
      <hr />
      <h4>{pattern.title} - Story</h4>

      {#if !pattern.story || !pattern.story.length}
        <h1 class="text-danger">No story defined for this pattern!</h1>
      {/if}
      {#each pattern.story as line}
        <div class="line">
          {#if line.type === "reading"}
            <StoryLineReading {line} />
          {:else}
            <StoryLineChoice {line} />
          {/if}
        </div>
      {/each}
      <hr />
      <h4>{pattern.title} - Exercises</h4>
      {#if !pattern.exercises || !pattern.exercises.length}
        <h1 class="text-danger">No exercises defined for this pattern!</h1>
      {/if}
      {#each pattern.exercises as line}
        <div class="line">
          <StoryLineFillblank {line} {pattern} />
        </div>
      {/each}
    </div>
  {/each}
</SiteLayout>

<style>
  .pattern {
    max-width: 720px;
    margin: auto;
    margin-bottom: 8rem;
  }

  .pattern h4 {
    margin-bottom: 1rem;
  }

  .pattern .line {
    margin-bottom: 1rem;
  }
</style>
