<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"
  export let header: string | null = null
  export let text: string

  const headerRow = header?.split(" / ")
  const lines = text.trim().split("\n")
  const rows = lines.map((l) => l.split(" / "))
</script>

<template>
  <table class="mt-2 ltable table table-bordered">
    {#if headerRow}
      <thead>
        <tr>
          {#each headerRow as d}
            <th>
              {d}
            </th>
          {/each}
        </tr>
      </thead>
    {/if}
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as d}
            <td>
              <Sprachdown source={d} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</template>

<style lang="sass">
.ltable
  th
    border-bottom: none

  :global(p)
    margin: 0
</style>
