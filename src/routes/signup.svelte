<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = ({ url }) => {
    const email = url.searchParams.get("email")
    const next = url.searchParams.get("next")
    return {
      props: {
        email: email || "",
        next: next || "",
      },
    }
  }
</script>

<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import { onMount } from "svelte"
  import SprachyLogo from "$lib/SprachyLogo.svelte"
  import { errorsByField } from "$lib/client/clientUtil"
  import { goto, prefetchRoutes } from "$app/navigation"
  import { browser } from "$app/env"
  import { session } from "$app/stores"
  let loading: boolean = false
  let errors: Record<string, string> = {}

  export let email: string
  export let next: string
  let password: string = ""
  let confirmPassword: string = ""
  let wantsReminderEmails: boolean = false

  if (browser) {
    onMount(() => {
      if (email) {
        const el = document.getElementById("password")! as HTMLInputElement
        el.focus()
      }
    })
  }

  async function signup() {
    const { api } = sprachy.expectBrowser()

    prefetchRoutes([next || "/home"])

    errors = {}
    if (password != confirmPassword) {
      errors.confirmPassword = "This doesn't match the password"
      return
    }

    try {
      const { summary } = await api.signUp({
        email: email,
        password: password,
        confirmPassword,
        wantsReminderEmails: wantsReminderEmails,
      })

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
  <form on:submit|preventDefault={signup}>
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

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
    <fieldset class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={confirmPassword}
        name="confirm_password"
        id="confirm_password"
        type="password"
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

    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        checked={wantsReminderEmails}
        id="wantsReminderEmails"
        on:change|preventDefault={() =>
          (wantsReminderEmails = !wantsReminderEmails)}
      />
      <label class="form-check-label" for="wantsReminderEmails">
        Send me reminder emails when patterns are ready to review
      </label>
    </div>

    {#if errors.other}
      <div class="text-danger">
        {errors.other}
      </div>
    {/if}
    <button class="btn btn-sprachy" type="submit" disabled={loading}
      >Sign up</button
    >

    <hr />
    <p class="callout">
      <a sveltekit:prefetch href={next ? `/login?next=${next}` : "/login"}
        >Sign in to an existing account</a
      >
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

.form-check
  margin-top: 1rem
  font-size: 0.95rem
  color: #333
</style>
