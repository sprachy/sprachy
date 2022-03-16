<script lang="ts">
  import _ from "lodash";
  import type { Exercise } from "$lib/Pattern";
  import SiteLayout from "$lib/SiteLayout.svelte";
  // import sprachy from "./sprachy";
  // import StoryLineFillblank from "./StoryLineFillblank.svelte";
  // import type { PatternAndProgress } from "./UserApp";

  // let freePractice: boolean = false;
  // const noPatternsYet = sprachy.app.learnedPatterns.length === 0;
  // const patternsToLevel = sprachy.app.patternsReadyToLevel;

  // type Review = Exercise & {
  //   pattern: PatternAndProgress;
  // };

  // let reviews: Review[] = [];
  // if (patternsToLevel.length === 0) {
  //   freePractice = true;
  //   reviews = _.sampleSize(sprachy.app.allReviews, 10);
  // } else {
  //   reviews = _.shuffle(sprachy.app.reviewsForLeveling);
  // }

  // let reviewIndex: number = 0;
  // let completed = false;

  // $: review = reviews[reviewIndex];

  // async function levelUpPattern(pattern: PatternAndProgress) {
  //   const progressItem = await sprachy.api.completeLevel(
  //     pattern!.id,
  //     pattern.progress.srsLevel + 1
  //   );
  //   if (progressItem) {
  //     sprachy.app.receiveProgressItem(progressItem);
  //   }
  // }

  // function nextReview() {
  //   const completedReview = review;
  //   if (completedReview) {
  //     const remainingReviews = reviews.slice(reviewIndex + 1);
  //     if (
  //       !remainingReviews.some((r) => r.pattern === completedReview.pattern)
  //     ) {
  //       // Completed reviews for a pattern, level it up
  //       levelUpPattern(completedReview.pattern);
  //     }
  //   }

  //   if (reviewIndex >= reviews.length - 1) {
  //     // Completed all reviews
  //     completed = true;
  //   } else {
  //     reviewIndex += 1;
  //   }
  // }
</script>

<SiteLayout>
  <!-- {#if !review}
    {#if noPatternsYet}
      <p>You haven't learned any patterns to practice yet!</p>
    {:else}
      <p>
        Missing exercise definitions for {patternsToLevel
          .map((p) => p.title)
          .join(", ")}! Let's add those~
      </p>
    {/if}
  {:else if completed}
    <p>All reviews completed!</p>
  {:else}
    <header class="practice-header">
      <h3>Free Practice</h3>
      <p class="text-secondary">
        There aren't any patterns ready to level yet. If you like, you can practice random exercises
        here.
      </p>
    </header>
    <div class="exercises">
      <StoryLineFillblank line={review} on:correct={nextReview} />
    </div>
  {/if} -->
</SiteLayout>

<style lang="sass">
.practice-header
  margin-bottom: 2rem
  text-align: center

.exercises
  margin: auto
  max-width: 600px
</style>
