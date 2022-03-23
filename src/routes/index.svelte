<script lang="ts" context="module">
  import type { Load } from "./index"

  export const load: Load = async ({ session }) => {
    if (session.userId) {
      return {
        status: 303,
        redirect: "/home",
      }
    } else {
      return {
        status: 200,
      }
    }
  }
</script>

<script lang="ts">
  import { goto } from "$app/navigation"
  import PublicPage from "$lib/PublicPage.svelte"
  import _ from "lodash"
  import { sprachdex } from "$lib/sprachdex"
  import PatternIndex from "$lib/PatternIndex.svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"

  let email: string = ""
  let password: string = ""
  let confirmPassword: string = ""
  let errors = {}

  async function gotoSignup() {
    goto("/signup?email=" + encodeURIComponent(email))
  }

  const pageDesc =
    "Sprachy is a German learning web app with dorky characters, linguistic patterns, SRS, and extradimensional squirrels."
</script>

<PublicPage
  title="Sprachy, an application for learning German"
  canonicalPath="/"
  metaDesc={pageDesc}
  cardDesc={pageDesc}
  cardImg="/meta-image.jpg"
  cardBig={true}
>
  <SiteLayout noContainer={true}>
    <section class="banner">
      <div class="container">
        <div class="row">
          <div class="col sitedesc">
            <h1>Learn German the clever and cute way</h1>
            <p>
              Sprachy combines detailed explanations of language patterns with
              memorable dialogue exercises. Also we have extradimensional
              psionic squirrels.
            </p>
          </div>
          <div class="col">
            <div class="signup">
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

                <button class="btn btn-sprachy btn-lg" type="submit"
                  >Sign up for Sprachy</button
                >
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="patterns">
      <div class="container">
        <h2>All patterns</h2>
        <PatternIndex />
      </div>
    </section>
  </SiteLayout>
</PublicPage>

<style lang="sass">

.container
  position: relative
  max-width: 1140px

section.banner
  position: relative
  background-image: url(/sprachy-bg.jpg)
  background-size: cover
  background-position: 50% 75%
  padding: 4rem 2rem

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,0.3)
  
  .sitedesc
    color: white

    p
      font-size: 1.5rem
      margin-bottom: 2rem

  .signup
    padding: 24px
    background: white

    .form-group
      margin-bottom: 1rem

    h1
      margin-top: 10px
      font-size: 3.3rem
      margin-bottom: 2rem

    button
      width: 100%
      padding: 20px 32px

section.patterns
  padding-top: 3rem

  // div.half
  //   display: flex
  //   flex-direction: column
  //   width: 50%
  //   z-index: 1

  //   h1
  //     font-size: 3.5rem
  //     margin-bottom: 1.5rem
    
  //   h5
  //     font-size: 1.3rem
  //     line-height: 1.8rem
  //     margin-bottom: 1.5rem

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
