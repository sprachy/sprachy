<script lang="ts" context="module">
  import { isAuthedRoute } from "$lib/routing";
  import type { Load } from "./__layout";

  export const load: Load = async ({ url, session }) => {
    const needsAuth = isAuthedRoute(url.pathname);
    const loggedIn = !!session.userId;

    if (!loggedIn && needsAuth) {
      return {
        status: 303,
        redirect: "/login?redirect=" + encodeURIComponent(url.pathname),
      };
    } else {
      return {};
    }
  };
</script>

<script lang="ts">
  import { browser } from "$app/env";
  import { session } from "$app/stores";
  import { page } from "$app/stores";
  import sprachy from "$lib/sprachy";

  let loading: boolean = true;

  async function startSPA() {
    try {
      await sprachy.initSPA();
    } finally {
      loading = false;
    }
  }

  if (browser && $session.userId && !sprachy.spa && !$page.error) {
    startSPA();
  } else {
    loading = false;
  }
</script>

{#if !loading}
  <slot />
{/if}

<style lang="sass" global>
  @import '../app.sass'
</style>
