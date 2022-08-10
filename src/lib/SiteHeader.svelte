<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/env"
  import { page } from "$app/stores"
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap"
  import { sprachdex } from "./sprachdex"
  import defaultProfileImage from "$lib/img/squirrel.webp"
  import MuteToggle from "./MuteToggle.svelte"

  export let fixed: boolean = false

  const { user, admin, restBonusAvailable } = sprachy.maybeSPA()
</script>

<template>
  <header class="site-header" class:fixed>
    <Navbar color="light" light expand="md" container={true}>
      <NavbarBrand href="/">
        Sprachy
        {#if dev}
          <span class="envbadge dev">dev</span>
        {/if}
      </NavbarBrand>
      <NavbarToggler id="navbarToggler" />
      <Collapse navbar expand="md" toggler="#navbarToggler">
        <Nav class="ms-auto" navbar>
          <NavItem>
            <NavLink href="/learn">Learn</NavLink>
          </NavItem>
          <!-- <NavItem>
            <NavLink href="/practice">
              <div class="d-flex align-items-center">
                Practice

                {#if $restBonusAvailable}
                  <Fa icon={faMoon} color="#0787c3" class="ms-1" />
                {/if}

                {#if $reviewsForLeveling.length > 0}
                    <span class="badge review-count ms-1">
                      {$reviewsForLeveling.length}
                    </span>
                  {/if}
              </div>
            </NavLink>
          </NavItem> -->

          <Dropdown nav inNavbar>
            <DropdownToggle nav caret>Patterns</DropdownToggle>
            <DropdownMenu end>
              {#each sprachdex.publishedPatterns as pattern}
                <DropdownItem href={`/${pattern.slug}`}>
                  {pattern.title}
                </DropdownItem>
              {/each}
            </DropdownMenu>
          </Dropdown>

          <NavItem>
            <NavLink href="/faq">FAQ</NavLink>
          </NavItem>

          {#if $user}
            <NavItem>
              <MuteToggle />
            </NavItem>

            {#if $admin}
              <Dropdown nav inNavbar>
                <DropdownToggle nav caret>Admin</DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="/admin/users">Users</DropdownItem>
                  <DropdownItem href="/admin/testall">Testall</DropdownItem>
                  <DropdownItem href="/admin/voicetest">Voicetest</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            {/if}

            <Dropdown nav inNavbar>
              <DropdownToggle nav caret>
                {#if $user.pfp}
                  <img src={$user.pfp} alt={$user.email} class="avatar" />
                {:else}
                  <img
                    src={defaultProfileImage}
                    alt={$user.email}
                    class="avatar"
                  />
                {/if}
              </DropdownToggle>
              <DropdownMenu end>
                {#if $user.username}
                  <DropdownItem href="/user/{$user.username}"
                    >Profile</DropdownItem
                  >
                {:else}
                  <DropdownItem href="/profile/setup">Profile</DropdownItem>
                {/if}
                <DropdownItem href="/settings">Settings</DropdownItem>
                <!-- <DropdownItem href="/subscribe">Subscription</DropdownItem> -->
                <a href="/logout" class="dropdown-item" sveltekit:reload
                  >Log out</a
                >
              </DropdownMenu>
            </Dropdown>
          {/if}

          {#if !$user}
            <NavItem>
              <NavLink
                href={$page.url.pathname === "/"
                  ? "/login"
                  : `/login?next=${$page.url.pathname}`}>Login</NavLink
              >
            </NavItem>
            <NavItem>
              <NavLink
                href={$page.url.pathname === "/"
                  ? "/signup"
                  : `/signup?next=${$page.url.pathname}`}>Sign up</NavLink
              >
            </NavItem>
          {/if}
        </Nav>
      </Collapse>
    </Navbar>
  </header>
</template>

<style>
  :root {
    --site-header-height: 62px;
  }

  :global(.collapsing) {
    transition: none !important;
  }

  header.fixed {
    position: fixed;
    z-index: 1;
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
