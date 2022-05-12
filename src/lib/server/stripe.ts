/**
 * TODO use the actual stripe lib
 * requires polyfilling node stuff with vite/esbuild options in 
 * a way I haven't figured out yet
 */

import http from './http'
import { env } from './env'
import type Stripe from 'stripe'

/** Stripe subscription */
interface Subscription {
  items: {
    data: {
      id: string
      object: "subscription_item"
    }[]
  }
  // More stuff 
}

/** Retrieve a subscription by id */
export async function subscriptionsRetrieve(subscriptionId: string) {
  const res = await http.get(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
    {
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
      }
    }
  )
  return (await res.json()) as Subscription
}

interface SubscriptionUpdateOptions {
  cancel_at_period_end: boolean
  proration_behavior: 'create_prorations'
  items: {
    id: string
    plan: string
  }[]
}

export async function subscriptionsUpdate(subscriptionId: string, options: SubscriptionUpdateOptions) {
  const resp = await http.post(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, options, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return resp
}

interface CheckoutSessionCreateOptions {
  customer_email: string
  payment_method_types: ['card']
  subscription_data: {
    items: {
      plan: string
    }[]
  }
  success_url: string
  cancel_url: string
}

export async function checkoutSessionsCreate(options: CheckoutSessionCreateOptions) {
  const res = await http.post("https://api.stripe.com/v1/checkout/sessions", options, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return (await res.json()) as Stripe.Checkout.Session
}

export async function subscriptionsDel(subscriptionId: string) {
  const resp = await http.del(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return resp
}

export async function billingPortalSessionsCreate(options: Stripe.BillingPortal.SessionCreateParams) {
  const res = await http.post(`https://api.stripe.com/v1/billing_portal/sessions`, options, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return (await res.json()) as Stripe.BillingPortal.Session
}

export async function customersCreate(options: Stripe.CustomerCreateParams) {
  const res = await http.post(`https://api.stripe.com/v1/customers`, options, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return (await res.json()) as Stripe.Customer
}

export async function getCheckoutSessionsLineItems(sessionId: string) {
  const res = await http.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`, {
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`
    }
  })

  return (await res.json()) as Stripe.ApiList<Stripe.LineItem>
}