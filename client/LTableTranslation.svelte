<script lang="ts">
  import { translations } from "../common/translations"
  export let original: string

  const translation = translations[original]
</script>

<div class="cell">
  <div class="original">{original}</div>
  {#if translation}
    <div class="translation">{translation}</div>
  {/if}
</div>

<style lang="sass">
  .original
    font-size: 105%

  .translation
    color: #777
    font-size: 90%
</style>
