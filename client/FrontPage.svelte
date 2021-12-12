<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { SprachyAPIValidationError } from "./SprachyAPIClient"
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte"

  let email: string = ""
  let password: string = ""
  // let afterAuthUrl: string = "";
  let errors: SprachyAPIValidationError["messagesByField"] = {}

  onMount(() => {
    if (sprachy.user) {
      navigate("/home")
    }
  })

  async function signup() {
    try {
      const summary = await sprachy.api.signUp({ email, password })
      sprachy.initApp(summary)
      navigate("/home")
      // this.$routing.navigate("/home");
    } catch (err: any) {
      if (err instanceof SprachyAPIValidationError) {
        errors = err.messagesByField
      } else {
        throw err
      }
    }
  }
</script>

<div class="frontpage">
  <header class="container">
    <a class="logo" href="/"> Sprachy </a>
  </header>
  <main class="container">
    <div class="w-50">
      <h1>Learn German the weird and dorky way</h1>
      <p>
        Language-learning apps too often focus on boring, everyday examples.
        Sprachy guarantees the involvement of 100% more cute psychic squirrels
        from beyond the interdimensional veil.
      </p>
      <form on:submit|preventDefault={signup}>
        <fieldset class="form-group">
          <label for="email">Email</label>
          <input
            bind:value={email}
            name="email"
            id="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
          <!-- :state="errors.email ? false : null" -->
        </fieldset>
        <fieldset class="form-group">
          <label for="password">Password</label>
          <input
            bind:value={password}
            name="password"
            id="password"
            type="password"
            class="form-control"
            placeholder="Password"
            minLength="10"
            required
          />
          <!-- :state="errors.password ? false : null" -->
        </fieldset>
        <!-- <b-form-invalid-feedback v-if="errors.email">
              {{ errors.email }}
            </b-form-invalid-feedback> -->
        <!-- <b-form-invalid-feedback v-if="errors.password">
              {{ errors.password }}
            </b-form-invalid-feedback> -->
        <!-- <input type="hidden" name="then" :value="afterAuthUrl" /> -->
        <button class="btn btn-lg text-white" type="submit"
          >Sign up for Sprachy</button
        >
        <p class="text-warning mt-2">
          <em
            >Sprachy is still early in development; you might want to come back
            later!</em
          >
        </p>
      </form>
    </div>
  </main>
</div>

<style lang="sass">
a:first-child
  margin-right: 1rem

a:last-child
  margin-left: 1rem

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

header
  color: white

main.container
  position: relative
  flex-grow: 1
  padding-top: 8rem
  color: white

  h1
    font-size: 3.3rem

  .btn
    background-color: #cd5527
    border-color: #cd5527
</style>
