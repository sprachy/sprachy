<template>
  <div class="frontpage">
    <header>
      <b-navbar toggleable="md" type="dark">
        <b-container>
          <b-navbar-toggle target="nav_collapse" />

          <b-navbar-brand to="/">
            Sprachy
            <span v-if="isDev" class="envbadge dev">dev</span>
          </b-navbar-brand>

          <b-collapse id="nav_collapse" is-nav>
            <!-- Right-aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/learn" class="mr-2"> Learn </b-nav-item>
              <b-nav-item to="/review" class="mr-2">
                Review{{ numReviews ? `: ${numReviews}` : "" }}
              </b-nav-item>
              <b-nav-item v-if="$admin" to="/admin/patterns" class="mr-2">
                Admin
              </b-nav-item>
              <b-nav-item to="/settings" class="mr-2">
                {{ name }}
              </b-nav-item>
              <b-nav-item to="/login">Sign in</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>
    <main class="container">
      <b-row>
        <b-col>
          <h1>Learn German with Sprachy</h1>
          <p>
            Sprachy helps you learn German using the
            <em>patterns</em> in the structure of the language. No random
            memorization: learn with context and connections between concepts,
            and practice producing real grammar.
          </p>
          <form @submit.prevent="signup">
            <b-form-group label="Email">
              <b-input
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                v-model="email"
              />
            </b-form-group>
            <b-form-group label="Password">
              <b-input
                name="password"
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                :minLength="10"
                required
                v-model="password"
              />
            </b-form-group>
            <b-btn type="submit" className="btn">Sign up for Sprachy</b-btn>
          </form>
        </b-col>
        <b-col> </b-col>
      </b-row>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {},
})
export default class FrontPage extends Vue {
  activated() {
    if (this.$app.user) {
      this.$app.navigateReplace("/home")
    }
  }
}
</script>

<style lang="sass" scoped>
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

header
  color: white

main.container
  position: relative
  flex-grow: 1
  padding-top: 8rem
  color: white

  h1
    font-size: 3.3rem
</style>
