<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import Story from "$lib/Story.svelte"
  import LearnCardExercises from "$lib/LearnCardExercises.svelte"
  import LevelBar from "$lib/LevelBar.svelte"

  const { nextThingToLearn, totalExperience } = sprachy.expectSPA()

  $: reviews = $nextThingToLearn?.pattern.exercises.map((ex) => {
    return {
      ...ex,
      pattern: $nextThingToLearn!.pattern,
    }
  })!
</script>

<SiteLayout>
  <h1>Learning Stuff</h1>
  <div class="learn">
    <div class="row">
      <div class="col-md-4">
        <div class="overview">
          <LevelBar experience={$totalExperience} />
        </div>
      </div>
      <div class="col">
        <div class="learnable">
          {#if $nextThingToLearn}
            {#if $nextThingToLearn.type === "pattern"}
              <Story story={$nextThingToLearn.pattern.story} />
            {:else}
              <LearnCardExercises exercises={reviews} />
            {/if}
          {:else}
            <p>You've already learned everything?! Congrats!</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</SiteLayout>

<style>
  .overview {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
  }

  .learnable {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
  }
</style>
