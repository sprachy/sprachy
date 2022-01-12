<script lang="ts">
  import { Link } from "svelte-navigator"
  import _ from "lodash"
  import { FontAwesomeIcon } from "fontawesome-svelte"
  import SiteLayout from "./SiteLayout.svelte"
  import Timeago from "./Timeago.svelte"
  import sprachy from "./sprachy"
  import { IS_PRODUCTION } from "./settings"
  import Sprachdown from "./Sprachdown.svelte"

  let patterns = sprachy.app.patternsAndProgress

  async function debugResetProgress() {
    const summary = await sprachy.api.http.post(`/api/debug/reset-progress`)
    sprachy.app.receiveProgress(summary)
    patterns = sprachy.app.patternsAndProgress
  }

  async function debugSkipTime() {
    const summary = await sprachy.api.http.post(`/api/debug/timeskip`)
    sprachy.app.receiveProgress(summary)
    patterns = sprachy.app.patternsAndProgress
  }
</script>

<SiteLayout>
  <main class="container">
    <ul>
      {#each patterns as pattern (pattern.id)}
        <li class="pattern">
          <Link to="/pattern/{pattern.slug}">
            <div class="icon" style="background-color: #1ba156">
              <FontAwesomeIcon icon={pattern.icon} />
            </div>
            <div>
              <h6 style="color: #1ba156">
                {pattern.title}
                {#each { length: pattern.progress.srsLevel } as _}
                  <span>⭐</span>
                {/each}
              </h6>
              <div class="shortdesc">
                <Sprachdown inline source={pattern.shortdesc} />
              </div>
              {#if pattern.progress.srsLevel > 0}
                <div class="timetolevel">
                  {#if !pattern.progress.levelableAt}
                    Mastered!
                  {:else}
                    Can be leveled <Timeago ts={pattern.progress.levelableAt} />
                  {/if}
                </div>
              {/if}
            </div>
          </Link>
        </li>
      {/each}
    </ul>
    <hr />
    <p><em>More patterns coming soon!</em></p>
    {#if !IS_PRODUCTION}
      <div class="debug">
        <button class="btn btn-outline-warning" on:click={debugResetProgress}
          >Debug: Reset Progress</button
        >
        <button class="btn btn-outline-warning" on:click={debugSkipTime}>Debug: Skip Time</button>
      </div>
    {/if}
  </main>
</SiteLayout>

<style lang="sass">
ul
  padding: 0

li.pattern:not(:first-child)
  margin-top: 1rem

li.pattern
  list-style-type: none

  > :global(a)
    display: flex
    align-items: center
    padding: 1rem
    padding-left: 0
    color: inherit
    text-decoration: none

  > :global(a):hover
    text-decoration: underline

  .icon
    padding: 0.75rem
    margin-right: 1rem

  .icon :global(svg)
    color: white
    width: 32px
    height: 32px

  h6
    font-size: 1.1rem
    margin-bottom: 0.1rem

  .shortdesc
    margin-bottom: 0.1rem

  .timetolevel
    font-style: italic
    color: #666
    font-size: 0.9rem
</style>
