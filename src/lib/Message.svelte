<script lang="ts">
  import Avatar from "./Avatar.svelte"
  export let from: string
  export let flip: boolean = false

  // function incoming(node: HTMLElement, { delay = 0, duration = 100 }) {
  //   const o = node.clientWidth

  //   return {
  //     delay,
  //     duration,
  //     css: (t: number) => `transform-origin: left; transform: scaleX(${t * 100}%)`,
  //   }
  // }
  // const names = {
  //   scientist: "Lindenbaum",
  //   deer: "Eiknir",
  // } as Record<string, string>

  // const name = names[from] || from
</script>

<div class:message={true} class:flip {...$$restProps}>
  <Avatar charId={from} />
  <!-- <div class="name">{name}</div> -->
  <div class="quoteContainer">
    <div class="quote">
      <slot />
    </div>
    <slot name="after" />
  </div>
</div>

<style lang="sass">
.message
  display: flex

  .quoteContainer
    max-width: 80%
    text-align: center
    

.message:not(.flip)
  :global(img)
      margin-top: calc(4px - 0.125rem)
      width: 50px
      height: 50px
      border-radius: 50%
      margin-right: 15px

  .quote
    position: relative
    background-color: #fff
    border: 2px solid #dedede
    border-radius: 14px
    border-top-left-radius: 0
    padding: 10px 12px
    font-size: 16.5px
  
  .quote::before
    border-bottom: 12px solid transparent
    border-right: 12px solid #dedede
    border-top-left-radius: 50%
    content: ""
    left: -14px
    position: absolute
    top: -2px

  .quote::after
    border-bottom: 12px solid transparent
    border-right: 12px solid #fff
    content: ""
    left: -9px
    position: absolute
    top: 0

.message.flip
  flex-direction: row-reverse

  :global(img)
    margin-top: calc(4px - 0.125rem)
    width: 50px
    height: 50px
    border-radius: 50%
    margin-left: 15px

  .quote
    position: relative
    background-color: #fff
    border: 2px solid #dedede
    border-radius: 14px
    border-top-right-radius: 0
    padding: 10px 12px
    font-size: 16.5px

  .quote::before
    border-bottom: 12px solid transparent
    border-left: 12px solid #dedede
    border-top-right-radius: 50%
    content: ""
    right: -14px
    position: absolute
    top: -2px

  .quote::after
    border-bottom: 12px solid transparent
    border-left: 12px solid #fff
    content: ""
    right: -9px
    position: absolute
    top: 0

</style>
