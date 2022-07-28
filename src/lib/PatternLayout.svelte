<script lang="ts">
  import Fa from "svelte-fa"
  import {
    faBook,
    faDumbbell,
    faComments,
    faList,
    faPlay,
  } from "@fortawesome/free-solid-svg-icons"
  import _ from "lodash"

  import SiteLayout from "$lib/SiteLayout.svelte"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import type { PatternDef } from "$lib/Pattern"
  import sprachy from "$lib/sprachy"

  const { patternsAndProgress } = sprachy.spa ?? {}

  export let activeTab: "dialogue" | "explanation" | "examples"
  export let pattern: PatternDef

  const progress = $patternsAndProgress?.find(
    (p) => p.id === pattern.id
  )?.progress
</script>

<SiteLayout fixedHeader>
  <div class="patternLayout">
    <aside class="sidebar">
      <h1>
        {pattern.title}
        {#if pattern.draft}
          <small class="text-danger fs-5">Draft</small>
        {/if}
      </h1>
      <p>
        <Sprachdown inline source={pattern.shortdesc} />
      </p>
      <nav>
        <ul>
          <li class:active={activeTab === "dialogue"}>
            <a sveltekit:prefetch href="/{pattern.slug}/dialogue">
              <Fa fw icon={faComments} />
              Dialogue
            </a>
          </li>
          <li class:active={activeTab === "explanation"}>
            <a sveltekit:prefetch href="/{pattern.slug}">
              <Fa fw icon={faBook} />
              Explanation
            </a>
          </li>
          <li class:active={activeTab === "examples"}>
            <a sveltekit:prefetch href="/{pattern.slug}/examples">
              <Fa fw icon={faList} />
              Examples
            </a>
          </li>
        </ul>
        <hr />

        <a
          class="btn btn-outline-primary w-100"
          sveltekit:prefetch
          href="/story/{pattern.slug}"
        >
          <Fa fw icon={faPlay} />
          Play dialogue
        </a>
        <a
          class="btn btn-outline-primary w-100"
          sveltekit:prefetch
          href="/{pattern.slug}/practice"
        >
          <Fa fw icon={faDumbbell} />
          Practice
        </a>
      </nav>
    </aside>
    <div class="inner">
      <slot />
    </div>
  </div>
</SiteLayout>

<style>
  .patternLayout {
    --sidebar-width: 250px;
    --sidebar-spacing: 2rem;
    margin: auto;
    display: flex;
    max-width: calc(720px + var(--sidebar-width) * 2);
  }

  .inner {
    width: 100%;
    margin-top: calc(var(--site-header-height) + 1rem);
    margin-left: calc(var(--sidebar-spacing) + var(--sidebar-width));
    margin-right: calc(var(--sidebar-spacing) + var(--sidebar-width));
  }

  .sidebar {
    position: fixed;
    margin-top: calc(var(--site-header-height) + 1rem);
    width: var(--sidebar-width);
    margin-right: var(--sidebar-spacing);
  }

  .sidebar:hover {
    opacity: 1;
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }

  .sidebar li a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: #333;
    text-align: left;
  }

  .sidebar li a :global(svg) {
    margin-right: 0.5rem;
  }

  .sidebar li.active a {
    background-color: var(--sprachy-primary);
    color: white;
  }

  .sidebar .btn {
    margin-bottom: 0.5rem;
  }
</style>
