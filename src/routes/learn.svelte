<script lang="ts">
  import { goto } from "$app/navigation"
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"

  const { nextPatternToLearn } = sprachy.expectSPA()
  const pattern = $nextPatternToLearn
  if (pattern) {
    goto(`/pattern/${pattern.slug}`, { replaceState: true })
  }
</script>

<SiteLayout>
  {#if !pattern}
    <p>You've learned all available patterns, congrats!</p>
  {/if}
</SiteLayout>
