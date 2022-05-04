<script lang="ts">
  import SiteLayout from "$lib/SiteLayout.svelte"

  const MONTHLY_PLAN_ID = "sprachy_monthly"

  let activePlanId: string | undefined = undefined
  let loading: boolean = false
</script>

<svelte:head>
  <style>
    body {
      background-color: #e5e5e5;
    }
  </style>
</svelte:head>

<SiteLayout>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-3 pricing-tile">
      <h4>Lite</h4>
      <div>
        <h3 class="price-point">$0</h3>
        <span>forever</span>
        <hr />
      </div>
      <ul class="plan-features">
        <li>All Pattern Pages</li>
        <li>Chapter 1 Interactive Exercises</li>
      </ul>
      <p class="subtext">
        Subscriptions with auto renewal turned off will revert to the free plan
      </p>
      {#if activePlanId}
        <button class="btn btn-outline-dark" disabled>Switch</button>
      {:else}
        <button class="btn btn-outline-dark" disabled>Active</button>
      {/if}
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 pricing-tile">
      <h4>Monthly</h4>
      <div>
        <h3 class="price-point">$5</h3>
        <span>per month</span>
        <hr />
      </div>
      <ul class="plan-features">
        <li>All Pattern Pages</li>
        <li>All Interactive Exercises</li>
      </ul>
      {#if activePlanId === MONTHLY_PLAN_ID}
        <button class="btn btn-outline-dark" disabled>Active</button>
      {:else}
        <button class="btn btn-outline-dark">Upgrade</button>
      {/if}
    </div>
  </div>
</SiteLayout>

<style lang="sass">
.pricing-tile
  background-color: white
  padding: 1rem
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)

.price-point
  color: #64b5f6
  font-size: 3.5rem

button
  width: 100%
</style>
