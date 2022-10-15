import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import * as stripe from '$lib/server/stripe'
import { db } from "$lib/server/db"
import { env } from "$lib/server/env"
import { LIVE_MONTHLY_PRICE_ID, LIVE_ANNUAL_PRICE_ID, TEST_MONTHLY_PRICE_ID, TEST_ANNUAL_PRICE_ID } from '$lib/constants'
import { jsonResponse } from '$lib/server/util'

export const POST: RequestHandler = async ({ request, locals, url }) => {
  const IS_LIVE = url.host === "sprachy.com"
  const MONTHLY_PRICE_ID = IS_LIVE ? LIVE_MONTHLY_PRICE_ID : TEST_MONTHLY_PRICE_ID
  const ANNUAL_PRICE_ID = IS_LIVE ? LIVE_ANNUAL_PRICE_ID : TEST_ANNUAL_PRICE_ID

  const subscriptionForm = z.object({
    priceId: z.enum([MONTHLY_PRICE_ID, ANNUAL_PRICE_ID])
  })

  // let user = await db.users.expect(locals.session!.userId)

  // if (!user.customerId) {
  //   const { id } = await stripe.customersCreate({ email: user.email })
  //   user = await db.users.update(user.id, { customerId: id })
  // }

  // const session = await stripe.billingPortalSessionsCreate({
  //   customer: user.customerId!,
  //   return_url: `${env.FRONTEND_BASE_URL}`
  // })

  // return {
  //   body: {
  //     url: session.url
  //   }
  // }


  const { priceId } = subscriptionForm.parse(await request.json())
  const user = await db.users.expect(locals.session!.userId)

  if (user.subscription) {
    if (user.subscription.priceId === priceId) {
      // User already subscribed to this plan, just pretend we did something
      return jsonResponse(200, { user: user })
    } else {
      // User is currently subscribed to different plan than requested, let's change it
      const { subscriptionId } = user.subscription

      const sub = await stripe.subscriptionsRetrieve(subscriptionId)
      // TODO error handling
      await stripe.subscriptionsUpdate(subscriptionId, {
        cancel_at_period_end: false,
        proration_behavior: 'create_prorations',
        items: [{
          id: sub.items.data[0]!.id,
          plan: priceId,
        }]
      })

      const newUser = await db.users.update(user.id, {
        subscription: {
          priceId: priceId,
          subscriptionId: subscriptionId,
          customerId: user.subscription.customerId,
          subscribedAt: Date.now()
        }
      })

      return jsonResponse(200, { user: newUser })
    }
  } else {
    // User has no currently active subscription, do a checkout session
    const session = await stripe.checkoutSessionsCreate({
      customer_email: user!.email,
      payment_method_types: ['card'],
      subscription_data: {
        items: [{
          plan: priceId,
        }],
      },
      success_url: `${env.FRONTEND_BASE_URL}/subscribe`,
      cancel_url: `${env.FRONTEND_BASE_URL}/subscribe`,
    })

    return jsonResponse(200, {
      checkoutSessionId: session.id
    })
  }
}