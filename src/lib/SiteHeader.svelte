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
  const { spa } = sprachy

  let isOpen = false

  function handleUpdate(event) {
    isOpen = event.detail.isOpen
  }
  // const patterns = spa ? spa.allViewablePatterns : []

  // let dropdownTrigger: HTMLButtonElement

  // async function logout() {
  //   await sprachy.api.logout()
  //   sprachy.closeApp()
  //   navigate("/")
  // }
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
          <NavItem>
            <NavLink href="/faq">FAQ</NavLink>
          </NavItem>

          {#if spa}
            {#if spa.admin}
              <NavItem>
                <NavLink href="/admin">Admin</NavLink>
              </NavItem>
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
          <!-- <Dropdown nav inNavbar>
            <DropdownToggle nav caret>Options</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </Dropdown> -->
        </Nav>
      </Collapse>
    </Navbar>

    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
            <li class="nav-item">
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
              </li>
          </ul>
        </div>
      </div>
    </nav> -->
  </header>
</template>

<style lang="sass">
.envbadge.dev
  color: green
  font-size: 1rem

.navbar-collapse
  flex-grow: 0

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
