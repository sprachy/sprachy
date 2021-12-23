<script lang="ts">
  import _ from "lodash"
  import { IS_PRODUCTION } from "./settings"
  import { Link, navigate } from "svelte-navigator"
  import sprachy from "./sprachy"

  const isDev = !IS_PRODUCTION

  async function logout() {
    await sprachy.api.logout()
    sprachy.closeApp()
    navigate("/")
  }
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <Link class="navbar-brand" to="/">
          Sprachy
          {#if isDev}
            <span class="envbadge dev">dev</span>
          {/if}
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
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
            <li class="nav-item">
              <Link class="nav-link" to="/faq">FAQ</Link>
            </li>
            {#if sprachy.admin}
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
</style>
