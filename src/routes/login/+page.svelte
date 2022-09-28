<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import SprachyLogo from "$lib/SprachyLogo.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import { goto, prefetchRoutes } from "$app/navigation"
  import { errorsByField } from "$lib/client/clientUtil"
  import type { PageData } from "./$types"

  export let data: PageData
  const { next } = data

  let email: string = ""
  let password: string = ""
  let loading: boolean = false
  let errors: Record<string, string> = {}

  async function login() {
    const { api } = sprachy.expectBrowser()

    prefetchRoutes([next || "/learn"])

    loading = true
    errors = {}
    try {
      const { summary } = await api.login({ email, password })
      await sprachy.initSPA(summary)
      window.location.replace(next || "/learn")
      // if (next) {
      //   goto(next, { replaceState: true })
      // } else {
      //   goto("/learn", { replaceState: true })
      // }
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

<PageStyling hideHeader />

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
      <a data-sveltekit-prefetch href="/reset-password">Forgot password?</a>
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
      New to Sprachy? <a
        data-sveltekit-prefetch
        href={next ? `/signup?next=${next}` : "/signup"}>Create an account</a
      >.
    </p>
  </form>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 340px;
    padding-left: 16px;
    padding-right: 16px;
    margin: auto;

    position: relative;
    top: -2rem;
  }

  form .form-header {
    text-align: center;
    margin-bottom: 1rem;
  }

  form h1 {
    font-size: 28px;
    text-align: center;
  }

  form fieldset {
    margin-top: 1rem;
  }

  form .forgot-password {
    font-size: 90%;
    margin-top: 0.2rem;
  }

  form button {
    margin-top: 1rem;
    width: 100%;
  }

  form .signup-callout {
    margin-top: 1rem;
    padding: 15px 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
</style>
