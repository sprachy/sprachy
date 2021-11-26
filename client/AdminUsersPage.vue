<template>
  <admin-layout>
    <b-table-simple class="mt-2">
      <b-thead>
        <b-tr>
          <b-th>Email</b-th>
          <b-th>Role</b-th>
        </b-tr>
      </b-thead>
      <b-tr v-for="user in users" :key="user.name" @click="editUser(user.id)">
        <td>{{ user.email }}</td>
        <td>{{ user.isAdmin ? "Admin" : "User" }}</td>
      </b-tr>
    </b-table-simple>
  </admin-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
import type { User } from "../common/api"

@Component({
  components: {},
})
export default class AdminUsersPage extends Vue {
  users: User[] = []

  async mounted() {
    this.users = await this.$api.admin.listUsers()
  }

  async editUser(userId: string) {
    await this.$router.navigate(`/admin/users/${userId}`)
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
