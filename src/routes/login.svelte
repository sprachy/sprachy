<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = ({ url, session }) => {
    const next = url.searchParams.get("next")
    if (session.userId) {
      return {
        status: 303,
        redirect: next || "/home",
      }
    }

    if (next) {
      return {
        props: {
          next,
        },
      }
    } else {
      return {}
    }
  }
</script>

<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import SprachyLogo from "$lib/SprachyLogo.svelte"
  import { goto, prefetchRoutes } from "$app/navigation"
  import { errorsByField } from "$lib/client/utils"
  import { session } from "$app/stores"

  export let next: string = ""
  let email: string = ""
  let password: string = ""
  let loading: boolean = false
  let errors: Record<string, string> = {}

  async function login() {
    const { api } = sprachy.expectBrowser()

    prefetchRoutes([next || "/home"])

    loading = true
    errors = {}
    try {
      const { summary } = await api.login({ email, password })
      $session.userId = summary.user.id
      await sprachy.initSPA(summary)
      if (next) {
        goto(next, { replaceState: true })
      } else {
        goto("/home", { replaceState: true })
      }
    } catch (err: any) {
      if (err?.response?.status == 422) {
        errors = errorsByField(err.response.data.errors)
      } else if (err?.response?.data?.message) {
        errors.other = err.response.data.message
      } else {
        throw err
      }
    } finally {
      loading = false
    }
  }
</script>

<main>
  <form on:submit|preventDefault={login}>
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

    <h1>Sign in to Sprachy</h1>
    <fieldset class="form-group">
      <label for="email">Email address</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={email}
        name="email"
        id="email"
        type="email"
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
        bind:value={password}
        name="password"
        id="password"
        type="password"
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
    <div class="forgot-password">
      <a sveltekit:prefetch href="/reset-password">Forgot password?</a>
    </div>

    {#if errors.other}
      <div class="text-danger">
        {errors.other}
      </div>
    {/if}

    <button class="btn btn-sprachy" type="submit" disabled={loading}
      >Sign in</button
    >

    <p class="signup-callout">
      New to Sprachy? <a sveltekit:prefetch href="/signup">Create an account</a
      >.
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

  h1
    font-size: 28px
    text-align: center

  fieldset
    margin-top: 1rem

  .forgot-password
    font-size: 90%
    margin-top: 0.2rem
  
  button
    margin-top: 1rem
    width: 100%

  .signup-callout
    margin-top: 1rem
    padding: 15px 20px
    text-align: center
    border: 1px solid #ccc
    border-radius: 6px
</style>
