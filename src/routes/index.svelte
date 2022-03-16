<script lang="ts">
  // import sprachy from "../sprachy";
  import _ from "lodash";
  import { onMount } from "svelte";
  let email: string = "";

  // onMount(() => {
  //   if (sprachy.user) {
  //     navigate("/home");
  //   }
  // });

  async function gotoSignup() {
    //   navigate("/signup?email=" + encodeURIComponent(email))
  }
</script>

<svelte:head>
  <title>Sprachy</title>
</svelte:head>

<div class="frontpage">
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="/login">Sign in</a>
          </li>
          <li class="nav-item signup-link">
            <a class="nav-link" href="/signup">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main class="container">
    <div class="signup-box">
      <h1>Learn German the clever and cute way</h1>
      <h5>
        Sprachy combines detailed explanations of language patterns with
        memorable dialogue exercises. Also we have extradimensional psionic
        squirrels.
      </h5>
      <form on:submit|preventDefault={gotoSignup}>
        <fieldset class="form-group">
          <label for="email">Email</label>
          <input
            bind:value={email}
            name="email"
            id="email"
            type="email"
            class:form-control={true}
            placeholder="Email"
            required
          />
        </fieldset>

        <button class="btn btn-sprachy btn-lg" type="submit"
          >Sign up for Sprachy</button
        >
      </form>
    </div>
  </main>
</div>

<style lang="sass">
.frontpage
  height: 100vh
  background-image: url(/sprachy-bg.jpg)
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

header
  padding: 1rem
  font-size: 110%

  :global(a)
    color: #333 !important

  .signup-link
    border: 1px solid #333
    border-radius: 6px
    margin-left: 1rem

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
