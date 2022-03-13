<script lang="ts">
  // import { Link } from "svelte-navigator"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  if (!sprachy.admin) {
    window.location.replace("/")
  }
</script>

<SiteLayout>
  <!-- <nav class="adminNavbar">
    <div class="container">
      <span class="mr-2"><strong>Admin</strong></span>
      <Link to="/admin/users" class="mr-2">Users</Link>
    </div>
  </nav> -->
  <!-- <div class="container"> -->
  <slot />
  <!-- </div> -->
</SiteLayout>
