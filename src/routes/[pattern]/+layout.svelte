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

  import Sprachdown from "$lib/Sprachdown.svelte"
  import { page } from "$app/stores"
  import type { PageData } from "./$types"
  import PageStyling from "$lib/PageStyling.svelte"

  export let data: PageData
  const { pattern } = data

  $: activeTab = ((url) => {
    if (url.pathname.endsWith("/dialogue")) {
      return "dialogue"
    } else if (url.pathname.endsWith("/examples")) {
      return "examples"
    } else {
      return "explanation"
    }
  })($page.url)
</script>

<PageStyling fixedHeader />

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
          <a data-sveltekit-prefetch href="/{pattern.slug}/dialogue">
            <Fa fw icon={faComments} />
            Dialogue
          </a>
        </li>
        <li class:active={activeTab === "explanation"}>
          <a data-sveltekit-prefetch href="/{pattern.slug}">
            <Fa fw icon={faBook} />
            Explanation
          </a>
        </li>
        {#if pattern.exercises.some((ex) => ex.type === "fillblank")}
          <li class:active={activeTab === "examples"}>
            <a data-sveltekit-prefetch href="/{pattern.slug}/examples">
              <Fa fw icon={faList} />
              Examples
            </a>
          </li>
        {/if}
      </ul>
      <hr />

      <a
        class="btn btn-outline-primary w-100"
        data-sveltekit-prefetch
        href="/story/{pattern.slug}"
      >
        <Fa fw icon={faPlay} />
        Play dialogue
      </a>
      <a
        class="btn btn-outline-primary w-100"
        data-sveltekit-prefetch
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
    top: calc(var(--site-header-height) + 1rem);
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
