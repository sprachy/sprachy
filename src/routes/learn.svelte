<script lang="ts">
  import { goto } from "$app/navigation";
  import sprachy from "$lib/sprachy";
  import SiteLayout from "$lib/SiteLayout.svelte";

  const pattern = sprachy.expectSPA().spa.nextPatternToLearn;
  if (pattern) {
    goto(`/pattern/${pattern.slug}`, { replaceState: true });
  }
</script>

<SiteLayout>
  {#if !pattern}
    <p>You've learned all available patterns, congrats!</p>
  {/if}
</SiteLayout>
