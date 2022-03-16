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
  import { spa } from "$lib/client/spa";

  let loading: boolean = false;

  async function startSPA() {
    loading = true;
    try {
      await spa.start();
    } finally {
      loading = false;
    }
  }

  if (browser && $session.userId && !spa.user) {
    startSPA();
  }
</script>

{#if loading}
  <div>loading...</div>
{:else}
  <slot />
{/if}

<style lang="sass" global>
  @import '../app.sass'
</style>
