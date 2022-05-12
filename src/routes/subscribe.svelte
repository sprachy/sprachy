<script lang="ts">
  import { loadStripe } from "@stripe/stripe-js"
  import { LIVE_MONTHLY_PRICE_ID, TEST_MONTHLY_PRICE_ID } from "$lib/constants"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import sprachy from "$lib/sprachy"
  import { onMount } from "svelte"
  const spa = sprachy.expectSPA()
  const { api, user } = spa

  const IS_LIVE = window.location.origin === "https://sprachy.com"
  const STRIPE_PUBLIC_KEY = IS_LIVE
    ? "pk_live_51KyJTvJlYNBfr7TbU37JuMfk86WU2XVe5nsCvjmPx2L6dCvwVjLXamo6KwjLW7Q9cnDsHsW398SwHvWcGKPNjCcA00Nza7EvwZ"
    : "pk_test_51KyJTvJlYNBfr7TbT6fTcg8lgRUOCzJuIziF0LTTd52pUkfbE6N4qRaeoDWVKwREd3JIMwuox1LG0ROHdXqv1kKA00iJLuvXQt"
  const MONTHLY_PRICE_ID = IS_LIVE
    ? LIVE_MONTHLY_PRICE_ID
    : TEST_MONTHLY_PRICE_ID

  const loadingStripe = loadStripe(STRIPE_PUBLIC_KEY)

  let loading: boolean = false

  $: activePriceId = $user.subscription?.priceId

  async function subscribeMonthly() {
    if (
      $user.subscription &&
      !window.confirm(
        `Change to the monthly plan? Stripe will apply an appropriate proration against your current plan.`
      )
    ) {
      return
    }

    let result
    try {
      loading = true
      result = await api.subscribe(MONTHLY_PRICE_ID)
    } finally {
      loading = false
    }

    if ("checkoutSessionId" in result) {
      const stripe = await loadingStripe

      const { error } = await stripe!.redirectToCheckout({
        sessionId: result.checkoutSessionId,
      })

      if (error) {
        throw error
      }
    } else {
      $user = result.user
    }
  }
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
      {#if activePriceId}
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
      {#if activePriceId === MONTHLY_PRICE_ID}
        <button class="btn btn-outline-dark" disabled>Active</button>
      {:else}
        <button
          class="btn btn-outline-dark"
          on:click={subscribeMonthly}
          disabled={loading}>Upgrade</button
        >
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
