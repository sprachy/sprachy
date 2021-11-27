<template>
  <div class="frontpage">
    <header>
      <b-navbar toggleable="md" type="dark">
        <b-container>
          <b-navbar-toggle target="nav_collapse" />

          <b-navbar-brand to="/"> Sprachy </b-navbar-brand>

          <b-collapse id="nav_collapse" is-nav>
            <!-- Right-aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/login">Sign in</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>
    <main class="container">
      <b-row>
        <b-col>
          <h1>Learn German the weird and dorky way</h1>
          <p>
            Language-learning apps too often focus on boring, everyday examples.
            Sprachy guarantees the involvement of 100% more cute psychic
            squirrels from beyond the interdimensional veil.
          </p>
          <form @submit.prevent="signup">
            <b-form-group label="Email">
              <b-input
                name="email"
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                required
                v-model="email"
              />
              <div v-if="errorMessage">
                {{ errorMessage }}
              </div>
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
            <input type="hidden" name="then" :value="afterAuthUrl" />
            <b-btn size="lg" type="submit">Sign up for Sprachy</b-btn>
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
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""
  errorMessage: string | null = null

  activated() {
    if (this.$user) {
      this.$router.navigateReplace("/home")
    }
  }

  async signup() {
    const { email, password } = this

    try {
      const summary = await this.$api.signUp({ email, password })
      this.$initApp(summary)
      this.$router.navigate("/home")
    } catch (err: any) {
      window.err = err
      console.log(err?.response?.data?.fieldErrors?.email[0])
      if (err?.response?.data?.fieldErrors?.email[0] === "Invalid email") {
        this.errorMessage = "Invalid email"
        console.log("Worked!")
      } else {
        console.log("Didn't work!")
        throw err
      }
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

  .btn
    background-color: #cd5527
    border-color: #cd5527
</style>
