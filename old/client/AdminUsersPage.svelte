<script lang="ts">
  import _ from "lodash"
  import { onMount } from "svelte"
  import { navigate } from "svelte-navigator"
  import type { User } from "../common/api"
  import AdminLayout from "./AdminLayout.svelte"
  import sprachy from "./sprachy"
  let users: User[] = []

  onMount(async () => {
    users = await sprachy.api.admin.listUsers()
  })

  function editUser(userId: string) {
    navigate(`/admin/users/${userId}`)
  }
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
      <tr on:click={() => editUser(user.id)}>
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
