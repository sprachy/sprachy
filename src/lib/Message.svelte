<script lang="ts">
  import Avatar from "./Avatar.svelte"
  export let from: string
  export let flip: boolean = false
  export let tooltip: string | undefined = undefined
</script>

<div class:message={true} class:flip {...$$restProps}>
  {#if from === "narrator"}
    <div class="text" data-tooltip={tooltip}>
      <slot />
    </div>
    <slot name="after" />
  {:else}
    <slot name="avatar">
      <Avatar charId={from} />
    </slot>
    <div class="quoteContainer">
      <div class="quote">
        <div class="text" data-tooltip={tooltip}>
          <slot />
        </div>
      </div>
      <slot name="after" />
    </div>
  {/if}
</div>

<style>
  .message {
    display: flex;
  }

  .quoteContainer {
    text-align: center;
  }

  .message:not(.flip) :global(.avatar img) {
    margin-top: calc(4px - 0.125rem);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .message:not(.flip) .quote {
    position: relative;
    background-color: #fff;
    border: 2px solid #dedede;
    border-radius: 14px;
    border-top-left-radius: 0;
    padding: 10px 12px;
    font-size: 16.5px;
  }

  .message:not(.flip) .quote::before {
    border-bottom: 12px solid transparent;
    border-right: 12px solid #dedede;
    border-top-left-radius: 50%;
    content: "";
    left: -14px;
    position: absolute;
    top: -2px;
  }

  .message:not(.flip) .quote::after {
    border-bottom: 12px solid transparent;
    border-right: 12px solid #fff;
    content: "";
    left: -9px;
    position: absolute;
    top: 0;
  }

  .message.flip {
    flex-direction: row-reverse;
  }

  .message.flip :global(.avatar img) {
    margin-top: calc(4px - 0.125rem);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 15px;
  }

  .message.flip .quote {
    position: relative;
    background-color: #fff;
    border: 2px solid #dedede;
    border-radius: 14px;
    border-top-right-radius: 0;
    padding: 10px 12px;
    font-size: 16.5px;
  }

  .message.flip .quote::before {
    border-bottom: 12px solid transparent;
    border-left: 12px solid #dedede;
    border-top-right-radius: 50%;
    content: "";
    right: -14px;
    position: absolute;
    top: -2px;
  }

  .message.flip .quote::after {
    border-bottom: 12px solid transparent;
    border-left: 12px solid #fff;
    content: "";
    right: -9px;
    position: absolute;
    top: 0;
  }
</style>
