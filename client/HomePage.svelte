<script lang="ts">
  import { Link } from "svelte-navigator"
  import _ from "lodash"
  import { FontAwesomeIcon } from "fontawesome-svelte"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  const patterns = sprachy.app.patternsWithProgress
</script>

<SiteLayout>
  <main class="container">
    Sprachy is a thingy for learning German with patterns!
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
                {#if pattern.progress}
                  {#each { length: pattern.progress.item.srsLevel } as _}
                    <span>⭐</span>
                  {/each}
                {/if}
              </h6>
              <div class="shortdesc">
                {pattern.shortdesc}
              </div>
              {#if pattern.progress}
                <div class="timetolevel">
                  {#if pattern.progress.mastered}
                    Mastered!
                  {:else}
                    Can be leveled in
                    <!-- <timeago :datetime="pattern.progress.levelableAt" /> -->
                  {/if}
                </div>
              {/if}
            </div>
          </Link>
        </li>
      {/each}
    </ul>
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
    color: inherit

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
