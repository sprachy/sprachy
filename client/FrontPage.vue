<template>
  <main class="container">
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Sign up</router-link>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {},
})
export default class FrontPage extends Vue {
  created() {
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

main
  height: calc(100vh - 5rem)
  display: flex
  align-items: center
  justify-content: center
</style>
