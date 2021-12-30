<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte"
  import SignupFormModal from "./SignupFormModal.svelte"
  import { errorsByField, otherResponse } from "./utils"

  let email: string = ""
  let password: string = ""
  let showSignupModal: boolean = false

  let loading: boolean = false
  let errors: Record<string, string> = {}

  onMount(() => {
    if (sprachy.user) {
      navigate("/home")
    }
  })

  async function login() {
    loading = true
    errors = {}
    const res = await sprachy.api.login({ email, password })
    loading = false

    if (res.status === 200) {
      sprachy.initApp(res.summary)
      if (window.location.search.length > 0) {
        navigate(window.location.search.substring(6))
      } else {
        navigate("/home")
      }
    } else {
      if (res.code === "new user") {
        showSignupModal = true
      } else if (res.code === "wrong password") {
        errors.password = "The password doesn't match the user"
      } else if (res.code === "validation failed") {
        errors = errorsByField(res.errors)
      } else {
        otherResponse(res)
      }
    }
  }

  function hideSignupModal() {
    showSignupModal = false
  }
</script>

<div class="frontpage">
  {#if showSignupModal}
    <SignupFormModal onDismiss={hideSignupModal} {email} {password} />
  {/if}
  <!-- <header class="container">
    <a class="logo" href="/"> Sprachy </a>
  </header> -->
  <main class="container">
    <div class="w-50">
      <h1>Learn German the weird and dorky way</h1>
      <p>
        Language-learning apps too often focus on boring, everyday examples. Sprachy guarantees the
        involvement of 100% more cute psychic squirrels from beyond the interdimensional veil.
      </p>
      <form on:submit|preventDefault={login}>
        <fieldset class="form-group">
          <label for="email">Email</label>
          <input
            bind:value={email}
            name="email"
            id="email"
            type="email"
            class:form-control={true}
            class:is-invalid={!!errors.email}
            placeholder="Email"
            required
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
        <button class="btn btn-sprachy btn-lg" type="submit" disabled={loading}
          >Enter Sprachy</button
        >
        <p class="text-warning mt-2">
          <em>Sprachy is still early in development; you might want to come back later!</em>
        </p>
      </form>
    </div>
  </main>
</div>

<style lang="sass">
// a:first-child
//   margin-right: 1rem

// a:last-child
//   margin-left: 1rem

.frontpage
  height: 100vh
  background-image: url(./img/sprachy-bg.jpg)
  background-size: cover
  background-position: 50% 75%
  display: flex
  flex-direction: column

.frontpage::before
  content: ''
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.4)

.form-group
  margin-bottom: 1rem

// header
//   color: white

main.container
  position: relative
  flex-grow: 1
  padding-top: 8rem
  color: white

  h1
    font-size: 3.3rem

</style>
