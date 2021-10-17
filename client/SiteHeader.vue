<template>
  <header>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav_collapse" />

        <b-navbar-brand href="/">
          Vokabon
          <span v-if="isDev" class="envbadge dev">dev</span>
        </b-navbar-brand>

        <b-collapse id="nav_collapse" is-nav>
          <!-- Right-aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/learn" class="mr-2"> Learn </b-nav-item>
            <b-nav-item to="/review" class="mr-2"> Review </b-nav-item>
            <b-nav-item v-if="$admin" to="/admin/patterns" class="mr-2">
              Admin
            </b-nav-item>
            <b-nav-item to="/settings" class="mr-2">
              {{ name }}
            </b-nav-item>
            <b-nav-item @click="logout"> Log out </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import { IS_PRODUCTION } from "./settings"
@Component({
  components: {},
})
export default class SiteHeader extends Vue {
  get isDev() {
    return !IS_PRODUCTION
  }

  get name() {
    return this.$app.user?.email
  }

  async logout() {
    await this.$api.logout()
    this.$app.user = null
    localStorage.removeItem("user")
    this.$app.navigate("/login")
  }
}
</script>

<style lang="sass">
.envbadge.dev
  color: green
  font-size: 1rem
</style>
