<script lang="ts">
  import _ from "lodash"
  import lukas from "./img/lukas.png"
  import anna from "./img/anna.png"
  import squirrel from "./img/squirrel.png"
  import scientist from "./img/scientist.png"
  import deer from "./img/deer.png"

  export let character: string

  $: icon = { lukas, anna, squirrel, scientist, deer }[character]
</script>

<img class="avatar" src={icon} alt={character} />

<style lang="sass" scoped>

</style>
