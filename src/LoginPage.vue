<template>
<div>
  <main class="container">
    <form @submit.prevent="login">
      <h4 className="mb-4">Login</h4>
      <div className="form-group">
          <label for="email">Email</label>
          <input name="email" id="email" className="form-control" placeholder="Email" required v-model="email" />
      </div>
      <div className="form-group">
          <label for="password">Password</label>
          <input name="password" id="password" type="password" className="form-control" placeholder="Password" :minLength="10" required v-model="password" />
      </div>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <button type="submit" className="btn">Login</button>
    </form>
  </main>
</div>
</template>

<script lang="ts">
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

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

  async login() {
    const { email, password } = this
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
  }
}
</script>

<style lang="sass">
</style>
