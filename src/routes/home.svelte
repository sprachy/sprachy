<script lang="ts">
  import _ from "lodash";
  import SiteLayout from "$lib/SiteLayout.svelte";
  import PatternItem from "$lib/PatternItem.svelte";
  import NextPatternHomeTile from "$lib/client/NextPatternHomeTile.svelte";
  import PracticeHomeTile from "$lib/client/PracticeHomeTile.svelte";
  import sprachy from "$lib/sprachy";
  import { dev } from "$app/env";

  async function debugResetProgress() {
    const { spa, api } = sprachy.expectSPA();
    const summary = await api.http.post(`/api/debug/reset-progress`);
    spa.receiveProgress(summary);
  }

  async function debugSkipTime() {
    const { spa, api } = sprachy.expectSPA();
    const summary = await api.http.post(`/api/debug/timeskip`);
    spa.receiveProgress(summary);
  }
</script>

<SiteLayout>
  {#if sprachy.spa}
    <div class="home">
      <div class="tiles">
        <NextPatternHomeTile />
        <PracticeHomeTile />
      </div>
      <hr />
      <div class="patterns">
        <section class="chapter">
          <h2>All patterns</h2>
          <ul>
            {#each sprachy.spa.patternsAndProgress as pattern (pattern.id)}
              <PatternItem {pattern} />
            {/each}
          </ul>
        </section>
        <section class="chapter">
          <p><em>More patterns coming soon!</em></p>
        </section>
        {#if dev}
          <div class="debug">
            <button
              class="btn btn-outline-warning"
              on:click={debugResetProgress}>Debug: Reset Progress</button
            >
            <button class="btn btn-outline-warning" on:click={debugSkipTime}
              >Debug: Skip Time</button
            >
          </div>
        {/if}
      </div>
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.chapter
  // header
  //   text-align: center

  ul
    padding: 0

.chapter:not(:first-child)
  margin-top: 1rem
  border-top: 1px solid #ccc
  padding-top: 1rem

.tiles
  display: flex

.patterns
  padding: 1rem

  ul
    display: flex
    flex-wrap: wrap
  
  ul :global(li)
    flex-basis: 33%

@media only screen and (max-width: 1200px)
  .patterns ul :global(li)
    flex-basis: 50%

@media only screen and (max-width: 768px)
  .patterns ul :global(li)
    flex-basis: 100%
</style>
