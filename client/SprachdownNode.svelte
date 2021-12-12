<script lang="ts">
  export let text: string

  console.log(text)

  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(text, "text/html")
  const node = htmlDoc.body.childNodes[0]
</script>

<p style="color: green;">
  <slot />
</p>

<style lang="sass" scoped>

</style>
