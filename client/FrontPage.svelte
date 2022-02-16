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
      const params = new URLSearchParams(window.location.search)
      const afterLoginUrl = params.get("next")
      if (afterLoginUrl) {
        navigate(afterLoginUrl)
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
    <div class="signup-box">
      <h1>Learn German the clever and cute way</h1>
      <h5>
        Sprachy combines detailed explanations of language patterns with memorable dialogue
        exercises. Also we have extradimensional psionic squirrels.
      </h5>
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

        <button class="btn btn-sprachy btn-lg" type="submit" disabled={loading}
          >Sign up for Sprachy</button
        >
        <!-- <p class="text-warning mt-2">
          <em>Sprachy is still early in development; you might want to come back later!</em>
        </p> -->
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
  background-color: rgba(0,0,0,0.03)

.form-group
  margin-bottom: 1rem

// header
//   color: white

main.container
  position: relative
  flex-grow: 1
  display: flex
  align-items: center

.signup-box
  width: 50%
  color: #5f2323

  h1
    font-size: 3.5rem
    margin-bottom: 1.5rem
  
  h5
    font-size: 1.3rem
    line-height: 1.8rem
    margin-bottom: 1.5rem

@media only screen and (max-width: 768px)
  .signup-box
    width: auto
    margin: 5%
    text-align: center
    h1
      font-size: 2.5rem
    h5
      font-size: 1rem

    button
      padding: 0.625rem 1.5625rem
      font-weight: 700
</style>
