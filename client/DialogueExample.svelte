<div class="dialogue">
  <slot />
</div>

<style lang="sass" scoped>
.dialogue
  box-shadow: 0 7px 50px rgba(46,10,99,.05), 0 1px 1px 0.6px rgba(46,10,99,.1)
  border-radius: 8px
  background-color: #36393e
  padding: 2rem
  margin-bottom: 1rem

  :global(.message):not(:first-child)
    margin-top: 20px
</style>
