<script lang="ts">
  import { translations } from "$lib/translations"
  export let original: string

  const translation = translations[original]
  const error = !translation
</script>

<div class="ruby" class:text-danger={!!error}>
  {original}
  <div class="translation">{translation}</div>
</div>

<style lang="sass">
  .translation
    font-style: italic
</style>
