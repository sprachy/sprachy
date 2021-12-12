<script lang="ts">
  import Avatar from "./Avatar.svelte"
  export let from: string

  const names = {
    scientist: "Lindenbaum",
    deer: "Eiknir",
  } as Record<string, string>

  $: username = names[from] || from
</script>

<div class="message">
  <Avatar character={from} />
  <div>
    <div class="username">{username}</div>
    <div class="quote">
      <slot />
    </div>
  </div>
</div>

<style lang="sass" scoped>
.message
  display: flex

  :global(.avatar)
    margin-top: calc(4px - 0.125rem)
    width: 40px
    height: 40px
    border-radius: 50%
    margin-right: 15px

  .username
    font-size: 1rem
    font-weight: 500
    color: #fff
    margin-bottom: 3px

  .quote
    font-size: 1.1rem
    line-height: 1.4rem
    color: var(--text-normal)
    font-weight: 400
    color: #dcddde

  // .translation
  //   padding-top: 2rem
  //   color: rgba(220, 221, 222, 0.7)
  //   text-align: center

  // .translation :global(strong)
  //   color: #86abff
</style>
