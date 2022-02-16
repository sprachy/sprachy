<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte"
  import { errorsByField, otherResponse } from "./utils"
  import SprachyLogo from "./SprachyLogo.svelte"
  let loading: boolean = false
  let errors: Record<string, string> = {}

  const params = new URLSearchParams(window.location.search)
  let email = params.get("email") || ""
  let password: string = ""
  let confirmPassword: string = ""

  onMount(() => {
    if (sprachy.user) {
      navigate("/home")
    }

    if (email) {
      const el = document.getElementById("password")! as HTMLInputElement
      el.focus()
    }
  })

  async function signup() {
    errors = {}
    if (password != confirmPassword) {
      errors.confirmPassword = "This doesn't match the password"
      return
    }

    loading = true
    const res = await sprachy.api.signUp({
      email: email,
      password: password,
      confirmPassword,
    })
    loading = false

    if (res.status === 200) {
      sprachy.initApp(res.summary)
      const params = new URLSearchParams(window.location.search)
      const afterSignupUrl = params.get("next")

      if (afterSignupUrl) {
        navigate(afterSignupUrl)
      } else {
        navigate("/home")
      }
    } else {
      if (res.code === "user already exists") {
        errors.email = "This email is already registered"
      } else if (res.code === "validation failed") {
        errors = errorsByField(res.errors)
      } else {
        otherResponse(res)
      }
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

    <button class="btn btn-sprachy" type="submit" disabled={loading}>Sign up</button>

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
