<script lang="ts" context="module">
  export const prerender = true

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
  import PatternIndex from "$lib/PatternIndex.svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"

  let email: string = ""

  async function gotoSignup() {
    goto("/signup?email=" + encodeURIComponent(email))
  }

  const pageDesc =
    "Sprachy is a German learning web app with dorky characters, linguistic patterns, SRS, and extradimensional squirrels."
</script>

<PublicPage
  title="Sprachy, a German learning application"
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
          <div class="signup">
            <h1>Learn German the clever and cute way</h1>

            <p>
              Sprachy combines detailed explanations of language patterns with
              memorable dialogue exercises. Also it involves extradimensional
              squirrels.
            </p>
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
    background-color: rgba(0,0,0,0.5)
  
  .signup
    width: 50%
    padding: 24px
    background: white

    h1
      margin-top: 10px
      font-size: 2.8rem
      margin-bottom: 1rem

    p
      font-size: 1.1rem

    .form-group
      margin-bottom: 1rem

    button
      width: 100%
      padding: 1rem

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
  section.banner
    padding: 2rem 1rem

    .signup
      width: 100%
</style>
