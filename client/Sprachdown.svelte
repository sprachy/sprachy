<script lang="ts">
  import _ from "lodash"
  import { sprachdown } from "../common/sprachdown"
  export let content: string
  export let inline: boolean = false

  $: template = inline
    ? `<span>` + sprachdown.parseInline(content) + `</span>`
    : `<div>` + sprachdown.parse(content) + `</div>`
</script>

<template>
  {@html template}
</template>
