<script lang="ts">
  import _ from "lodash"
  import LTableTranslation from "./LTableTranslation.svelte"
  import Sprachdown from "./Sprachdown.svelte"
  export let header: string | null = null
  export let text: string
  export let translate: boolean = false

  if (translate !== false) {
    translate = true
  }

  const headerRow = header?.split(" / ")
  const lines = text.trim().split("\n")
  const rows = lines.map((l) => l.split(" / "))
</script>

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
            {#if d !== "_"}
              {#if translate}
                <LTableTranslation original={d} />
              {:else}
                <Sprachdown source={d} />
              {/if}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style lang="sass">
.ltable
  text-align: center
  th
    border-bottom: none

  :global(p)
    margin: 0
</style>
