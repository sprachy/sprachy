<template>
  <main class="container">
    <form @submit.prevent="signup">
      <h4 className="mb-4">Create your account</h4>
      <div className="form-group">
        <label for="email">Email</label>
        <input
          name="email"
          id="email"
          className="form-control"
          placeholder="Email"
          required
          v-model="email"
        />
      </div>
      <div className="form-group">
        <label for="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          :minLength="10"
          required
          v-model="password"
        />
      </div>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <button type="submit" className="btn">Sign up</button>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"

const auth = getAuth()

import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {},
})
export default class App extends Vue {
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""
  errorMessage: string | null = null

  async signup() {
    const { email, password } = this
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
    } catch (err) {
      this.errorMessage = err.message
    }
  }
}
</script>

<style lang="sass">
main
  height: calc(100vh - 5rem)
  display: flex
  align-items: center
  justify-content: center
</style>
