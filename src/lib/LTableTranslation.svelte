<script lang="ts">
  import { translations } from "$lib/translations"
  export let original: string
  export let inline: boolean = false

  const m = original.match(/^(.+?) \((.+?)\)$/)
  const deutsch = m ? m[1] : original
  const translation = m ? m[2] : translations[original]
</script>

<div class:cell={true} class:inline>
  {#if inline}
    <span class="original">{deutsch}</span>
    {#if translation}<span class="translation">({translation})</span>{/if}
  {:else}
    <div class="original">{deutsch}</div>
    {#if translation}<div class="translation">{translation}</div>{/if}
  {/if}
</div>

<style lang="sass">
.cell.inline
  .original
    font-style: italic

.cell:not(.inline)
  .original
    font-size: 105%

  .translation
    color: #777
    font-size: 90%
</style>
