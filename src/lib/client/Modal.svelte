<script lang="ts">
  export let title: string | undefined
  // @Prop({ type: String, default: "" }) readonly title!: string

  // mounted() {
  //   setTimeout(
  //     () => window.addEventListener("click", this.maybeClickOutside),
  //     100
  //   )
  // }

  // beforeUnmount() {
  //   window.removeEventListener("click", this.maybeClickOutside)
  // }

  // maybeClickOutside(ev: MouseEvent) {
  //   if (
  //     !this.$el.querySelector(".modal-content").contains(ev.target as Node)
  //   ) {
  //     this.$emit("hidden")
  //   }
  // }
</script>

<div class="modal show" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header" />
        {#if title}
          <h5 class="modal-title">{title}</h5>
        {/if}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop show" />

<style>
  .modal {
    display: block !important;
  }
</style>
