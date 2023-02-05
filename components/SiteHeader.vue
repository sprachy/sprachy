<script setup lang="ts">
// import _ from "lodash"
// import sprachy from "~/lib/sprachy"
// import { dev } from "$app/environment"
// import { page } from "$app/stores"
// import defaultProfileImage from "$"
// import MuteToggle from "./MuteToggle.svelte"

let fixed: boolean = false
const user = false as any
const admin = false
const dev = false
// const { user, admin } = sprachy.maybeSPA()

const route = useRoute()

</script>

<template>
  <header :class="{ 'site-header': true, 'fixed': fixed }">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container">
        <NuxtLink class="navbar-brand" href="/">
          Sprachy
          <span v-if="dev" class="envbadge dev">dev</span>
        </NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li v-if="user" class="nav-item">
              <NuxtLink class="nav-link" aria-current="page" href="/learn">Learn</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" href="/patterns">Patterns</NuxtLink>
            </li>
            <!-- <li v-if="user" class="nav-item">
              <MuteToggle/>
            </li> -->
            <li class="nav-item">
              <NuxtLink class="nav-link" aria-current="page" href="/faq">FAQ</NuxtLink>
            </li>

            <li v-if="admin" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Admin
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink class="dropdown-item" href="/admin/users">Users</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" href="/admin/testall">Testall</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" href="/admin/voicetest">Voicetest</NuxtLink>
                </li>
              </ul>
            </li>

            <li v-if="user" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img v-if="user.pfp" :src="user.pfp" :alt="user.email" class="avatar" />
                <img v-else src="~/assets/squirrel.webp" :alt="user.email" class="avatar" />
              </a>
              <ul class="dropdown-menu">
                <li v-if="user.username">
                  <NuxtLink class="dropdown-item" :href="`/user/${user.username}`">Profile</NuxtLink>
                </li>
                <li v-else>
                  <NuxtLink class="dropdown-item" href="/profile/setup">Profile</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" href="/settings">Settings</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" href="/logout">Log out</NuxtLink>
                </li>
              </ul>
            </li>

            <!-- Login and signup links if not already logged in -->
            <template v-if="!user">
              <li class="nav-item">
                <NuxtLink class="nav-link" aria-current="page"
                  :href="route.path === '/' ? '/login' : `/login?next=${route.fullPath}`">Login</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" aria-current="page"
                  :href="route.path === '/' ? '/signup' : `/signup?next=${route.fullPath}`">Sign up</NuxtLink>
              </li>

            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
:root {
  --site-header-height: 62px;
}

:global(.collapsing) {
  transition: none !important;
}

header.fixed {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
}

.envbadge.dev {
  color: green;
  font-size: 1rem;
}

:global(.navbar-light .navbar-toggler):hover {
  background-color: inherit;
  box-shadow: inherit;
}

.avatar {
  vertical-align: top;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

:global(.nav-item) {
  display: flex;
  align-items: center;
}

header :global(.toggle-mute) {
  width: 47px;
  color: #666;
}
</style>
