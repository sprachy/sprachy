<script lang="ts">
  import _ from "lodash"
  import { IS_PRODUCTION } from "./settings"
  import { Link, navigate } from "svelte-navigator"
  import { maybeUserContext } from "./context"

  const { api, user } = maybeUserContext()

  const isDev = !IS_PRODUCTION

  async function logout() {
    await api.logout()
    // this.$closeApp()
    navigate("/")
  }

  // <b-navbar toggleable="md" type="light" variant="light">
  //     <b-container>
  //       <b-navbar-toggle target="nav_collapse" />

  //       <b-navbar-brand to="/">
  //       </b-navbar-brand>

  //       <b-collapse id="nav_collapse" is-nav>
  //         <!-- Right-aligned nav items -->
  //         <b-navbar-nav class="ml-auto">
  //           <b-nav-item to="/learn" class="mr-2"> Learn </b-nav-item>
  //           <b-nav-item to="/review" class="mr-2"> Practice </b-nav-item>
  //           <b-nav-item to="/faq" class="mr-2"> FAQ </b-nav-item>

  //           <b-nav-item v-if="$user" to="/settings" class="mr-2">
  //             {{ $user.email }}
  //           </b-nav-item>
  //           <b-nav-item @click="logout"> Log out </b-nav-item>
  //         </b-navbar-nav>
  //       </b-collapse>
  //     </b-container>
  //   </b-navbar>
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
              <Link class="nav-link" to="/review">Practice</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/faq">FAQ</Link>
            </li>
            {#if user}
              <li class="nav-item">
                <Link class="nav-link" to="/settings">{user.email}</Link>
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
