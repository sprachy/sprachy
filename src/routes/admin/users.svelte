<script lang="ts">
  import _ from "lodash"
  import { onMount } from "svelte"
  import type { User } from "$lib/api"
  import AdminLayout from "$lib/client/AdminLayout.svelte"
  import sprachy from "$lib/sprachy"
  let users: User[] = []

  const { api } = sprachy.expectSPA()

  onMount(async () => {
    users = await api.admin.listUsers()
  })

  // function editUser(userId: string) {
  //   goto(`/admin/users/${userId}`)
  // }
</script>

<AdminLayout>
  <h1>Users</h1>
  <table class="table table-bordered mt-2">
    <thead>
      <tr>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    {#each users as user}
      <tr>
        <td>{user.email}</td>
        <td>{user.isAdmin ? "Admin" : "User"}</td>
      </tr>
    {/each}
  </table>
</AdminLayout>

<style lang="sass">
h1
  font-size: 2.2rem
  margin-bottom: 1.5rem
tr
  cursor: pointer
</style>
