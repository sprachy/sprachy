<template>
  <div>
    <site-header />
    <b-navbar class="adminNavbar" type="light" variant="light">
      <b-container>
        <b-navbar-nav>
          <b-nav-item class="mr-2"><strong>Admin</strong></b-nav-item>
          <b-nav-item to="/admin/patterns" class="mr-2">Patterns</b-nav-item>
          <b-nav-item to="/admin/users" class="mr-2">Users</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <template v-if="noContainer">
      <slot />
    </template>
    <template v-else>
      <b-container id="main">
        <slot />
      </b-container>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import SiteHeader from "./SiteHeader.vue"

@Component({
  components: {
    SiteHeader,
  },
})
export default class AdminLayout extends Vue {
  @Prop({ type: Boolean, default: false }) noContainer!: boolean
}
</script>

<style lang="sass" scoped>
#main
  padding-top: 1.5rem
</style>
