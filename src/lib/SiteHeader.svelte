<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/env"
  import { page } from "$app/stores"
  import { isAuthedRoute } from "$lib/routing"
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
  const { spa } = sprachy

  let isOpen = false

  function handleUpdate(event: CustomEvent<any>) {
    isOpen = event.detail.isOpen
  }
</script>

<template>
  <header class="site-header">
    <Navbar color="light" light expand="md" container={true}>
      <NavbarBrand href="/">
        Sprachy
        {#if dev}
          <span class="envbadge dev">dev</span>
        {/if}
      </NavbarBrand>
      <NavbarToggler on:click={() => (isOpen = !isOpen)} />
      <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
          {#if spa}
            <NavItem>
              <NavLink href="/learn">Learn</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/practice">Practice</NavLink>
            </NavItem>
          {/if}

          <Dropdown nav inNavbar>
            <DropdownToggle nav caret>Patterns</DropdownToggle>
            <DropdownMenu end>
              {#each sprachdex.publishedPatterns as pattern}
                <DropdownItem href={`/pattern/${pattern.slug}`}>
                  {pattern.title}
                </DropdownItem>
              {/each}
            </DropdownMenu>
          </Dropdown>

          <NavItem>
            <NavLink href="/faq">FAQ</NavLink>
          </NavItem>

          {#if spa}
            {#if spa.admin}
              <Dropdown nav inNavbar>
                <DropdownToggle nav caret>Admin</DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="/admin/users">Users</DropdownItem>
                  <DropdownItem href="/admin/testall">Testall</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            {/if}

            <NavItem>
              <NavLink href="/settings">{spa.user.email}</NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href={isAuthedRoute($page.url.pathname)
                  ? "/logout"
                  : `/logout?next=${$page.url.pathname}`}>Log out</NavLink
              >
            </NavItem>
          {/if}

          {#if !spa}
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

<style lang="sass">
.envbadge.dev
  color: green
  font-size: 1rem

.navbar-collapse
  flex-grow: 0

:global(.navbar-light .navbar-toggler)
  &:hover
    background-color: inherit
    box-shadow: inherit

// .dropdown-toggle
//   all: unset
//   cursor: pointer


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
