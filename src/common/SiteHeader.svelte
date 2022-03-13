<script lang="ts">
  import _ from "lodash";
  // import { IS_PRODUCTION } from "./settings"
  import { Link, navigate } from "svelte-navigator";
  // import sprachy from "./sprachy"
  // @ts-ignore
  // import Dropdown from "sv-bootstrap-dropdown"

  // const patterns = sprachy.app.allViewablePatterns

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
        <Link class="navbar-brand" to="/">
          Sprachy
          <!-- {#if isDev}
            <span class="envbadge dev">dev</span>
          {/if} -->
        </Link>
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
              <Link class="nav-link" to="/learn">Learn</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/practice">Practice</Link>
            </li>
            <!-- <li class="nav-item">
              <div class="nav-link">
                <Dropdown triggerElement={dropdownTrigger}>
                  <button class="dropdown-toggle" bind:this={dropdownTrigger}> Patterns </button>
                  <div slot="DropdownMenu">
                    {#each patterns as pattern}
                      <Link class="dropdown-item" to={`/pattern/${pattern.slug}`}
                        >{pattern.title}</Link
                      >
                    {/each}
                  </div>
                </Dropdown>
              </div>
            </li> -->
            <li class="nav-item">
              <Link class="nav-link" to="/faq">FAQ</Link>
            </li>
            <!-- {#if sprachy.admin}
              <li class="nav-item">
                <Link class="nav-link" to="/admin">Admin</Link>
              </li>
            {/if}
            {#if sprachy.user}
              <li class="nav-item">
                <Link class="nav-link" to="/settings">{sprachy.user.email}</Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/logout" on:click|preventDefault={logout}>Log out</a>
              </li>
            {/if} -->
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
