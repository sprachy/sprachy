<script lang="ts">
  import Avatar from "./Avatar.svelte"
  export let from: string

  const names = {
    scientist: "Lindenbaum",
    deer: "Eiknir",
  } as Record<string, string>

  const username = names[from] || from
</script>

<div class="message">
  <Avatar character={from} />
  <!-- <div class="username">{username}</div> -->
  <div class="quote">
    <slot />
  </div>
</div>

<style lang="sass">
.message
  display: flex

  :global(.avatar)
    margin-top: calc(4px - 0.125rem)
    width: 40px
    height: 40px
    border-radius: 50%
    margin-right: 15px

  // .username
  //   font-size: 1rem
  //   font-weight: 500
  //   color: #fff
  //   margin-bottom: 3px

  // .quote
  //   font-size: 1.1rem
  //   line-height: 1.4rem
  //   color: var(--text-normal)
  //   font-weight: 400
  //   color: #dcddde

  .quote
    position: relative
    background-color: #fff
    border: 2px solid #dedede
    border-radius: 14px
    border-top-left-radius: 0
    max-width: 80%
    padding: 10px 12px
  
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



  // .translation :global(strong)
  //   color: #86abff
</style>
