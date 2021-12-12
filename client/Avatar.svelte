<script lang="ts">
  import _ from "lodash"
  // @ts-ignore
  import lukas from "./img/lukas.png"
  // @ts-ignore
  import anna from "./img/anna.png"
  // @ts-ignore
  import squirrel from "./img/squirrel.png"
  // @ts-ignore
  import scientist from "./img/scientist.png"
  // @ts-ignore
  import deer from "./img/deer.png"

  export let character: string

  $: icon = { lukas, anna, squirrel, scientist, deer }[character]
</script>

<img class="avatar" src={icon} alt={character} />

<style lang="sass" scoped>

</style>
