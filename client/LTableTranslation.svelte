<script lang="ts">
  import { translations } from "../common/translations"
  export let original: string

  const translation = translations[original]
  const error = !translation
</script>

<div class="cell" class:text-danger={!!error}>
  <div class="original">{original}</div>
  <div class="translation">{translation}</div>
</div>

<style lang="sass">
  .original
    font-size: 105%

  .translation
    color: #777
    font-size: 90%
</style>
