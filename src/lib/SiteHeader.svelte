<script lang="ts">
  import _ from "lodash";
  import { getContext } from "svelte";
  // import { IS_PRODUCTION } from "./settings"
  import { Link, navigate } from "svelte-navigator";
  import sprachy from "$lib/sprachy";
  // @ts-ignore

  const { spa } = sprachy;

  const patterns = spa ? spa.allViewablePatterns : [];

  let dropdownTrigger: HTMLButtonElement;

  // const isDev = !IS_PRODUCTION

  // async function logout() {
  //   await sprachy.api.logout()
  //   sprachy.closeApp()
  //   navigate("/")
  // }
</script>

<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a sveltekit:prefetch class="navbar-brand" href="/">
          Sprachy
          <!-- {#if isDev}
            <span class="envbadge dev">dev</span>
          {/if} -->
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/learn">Learn</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/practice">Practice</a>
            </li>
            {#if spa}
              <!-- <li class="nav-item">
                <div class="nav-link">
                  <Dropdown triggerElement={dropdownTrigger}>
                    <button class="dropdown-toggle" bind:this={dropdownTrigger}>
                      Patterns
                    </button>
                    <div slot="DropdownMenu">
                      {#each patterns as pattern}
                        <a
                          sveltekit:prefetch
                          class="dropdown-item"
                          href={`/pattern/${pattern.slug}`}>{pattern.title}</a
                        >
                      {/each}
                    </div>
                  </Dropdown>
                </div>
              </li> -->
            {/if}
            <li class="nav-item">
              <a class="nav-link" sveltekit:prefetch href="/faq">FAQ</a>
            </li>
            {#if spa}
              {#if spa.admin}
                <li class="nav-item">
                  <a class="nav-link" sveltekit:prefetch href="/admin">Admin</a>
                </li>
              {/if}
              <li class="nav-item">
                <a class="nav-link" sveltekit:prefetch href="/settings"
                  >{spa.user.email}</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/logout">Log out</a>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="sass">
.envbadge.dev
  color: green
  font-size: 1rem

.navbar-collapse
  flex-grow: 0

.dropdown-toggle
  all: unset
  cursor: pointer


// .caret
//   display: inline-block
//   width: 0
//   height: 0
//   margin-left: 2px
//   vertical-align: middle
//   border-top: 4px dashed
//   border-right: 4px solid transparent
//   border-left: 4px solid transparent
</style>
