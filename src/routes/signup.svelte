<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = ({ url }) => {
    const email = url.searchParams.get("email")
    if (email) {
      return {
        props: {
          email,
        },
      }
    } else {
      return {}
    }
  }
</script>

<script lang="ts">
  // import sprachy from "../sprachy"
  import _ from "lodash"
  import { onMount } from "svelte"
  import SprachyLogo from "$lib//SprachyLogo.svelte"
  import { browser } from "$app/env"

  export let errors: Record<string, string> = {}
  export let email: string = ""
  export let password: string = ""
  export let confirmPassword: string = ""
  // import { APIValidationError } from "../HTTPProvider"

  // const params = new URLSearchParams(window.location.search)
  // let email = params.get("email") || ""
  // let password: string = ""
  // let confirmPassword: string = ""

  if (browser) {
    onMount(() => {
      if (email) {
        const el = document.getElementById("password")! as HTMLInputElement
        el.focus()
      }
    })
  }

  // async function signup() {
  //   errors = {}
  //   if (password != confirmPassword) {
  //     errors.confirmPassword = "This doesn't match the password"
  //     return
  //   }

  //   try {
  //     const { summary } = await sprachy.api.signUp({
  //       email: email,
  //       password: password,
  //       confirmPassword,
  //     })

  //     sprachy.initApp(summary)
  //     const params = new URLSearchParams(window.location.search)
  //     const afterSignupUrl = params.get("next")

  //     if (afterSignupUrl) {
  //       navigate(afterSignupUrl)
  //     } else {
  //       navigate("/home")
  //     }
  //   } catch (err: any) {
  //     if (err instanceof APIValidationError) {
  //       errors = err.errorsByField
  //     } else {
  //       errors.other = err.message
  //     }
  //   } finally {
  //     loading = false
  //   }
  // }
</script>

<main>
  <!-- {JSON.stringify(errors)} -->
  <form method="post" action="/signup">
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

    <fieldset class="form-group">
      <label for="email">Email address</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        name="email"
        id="email"
        type="email"
        value={email}
        class:form-control={true}
        class:is-invalid={!!errors.email}
        placeholder="Email"
        required
        autofocus
      />
      {#if errors.email}
        <div class="invalid-feedback">
          {errors.email}
        </div>
      {/if}
    </fieldset>
    <fieldset class="form-group">
      <label for="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        value={password}
        class:form-control={true}
        class:is-invalid={!!errors.password}
        placeholder="Password"
        minLength="10"
        required
      />
      {#if errors.password}
        <div class="invalid-feedback">
          {errors.password}
        </div>
      {/if}
    </fieldset>
    <fieldset class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        class:form-control={true}
        class:is-invalid={!!errors.confirmPassword}
        placeholder="Confirm Password"
        minLength="10"
        required
      />
      {#if errors.confirmPassword}
        <div class="invalid-feedback">
          {errors.confirmPassword}
        </div>
      {/if}
    </fieldset>

    {#if errors.other}
      <div class="text-danger">
        {errors.other}
      </div>
    {/if}
    <button class="btn btn-sprachy" type="submit">Sign up</button>

    <hr />
    <p class="callout">
      <a href="/login">Sign in to an existing account</a>
    </p>
  </form>
</main>

<style lang="sass">
main
  height: 100%
  display: flex
  align-items: center
  justify-content: center

form
  width: 340px
  padding-left: 16px
  padding-right: 16px
  margin: auto

  position: relative
  top: -2rem

  .form-header
    text-align: center
    margin-bottom: 1rem

  // h1
  //   font-size: 28px
  //   text-align: center

  fieldset
    margin-top: 1rem

  button
    margin-top: 1rem
    width: 100%
</style>
