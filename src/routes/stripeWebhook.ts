import type { RequestHandler } from "@sveltejs/kit"
import type Stripe from 'stripe'

import { db } from "$lib/server/db"
import * as stripe from "$lib/server/stripe"
import type { PriceId } from "$lib/api"
import { env } from "$lib/server/env"
import http from "$lib/server/http"
import { LIVE_MONTHLY_PRICE_ID, TEST_MONTHLY_PRICE_ID } from "$lib/constants"

export const post: RequestHandler = async ({ request, locals }) => {
  const event = await request.json() as any

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const { data: lineItems } = await stripe.getCheckoutSessionsLineItems(session.id)

    const priceId = lineItems[0]!.price!.id
    const userEmail = session.customer_email!

    const user = await db.users.expectByEmail(userEmail)
    await db.users.update(user.id, {
      subscription: {
        priceId: priceId as PriceId,
        customerId: session.customer as string,
        subscriptionId: session.subscription as string,
        subscribedAt: Date.now()
      }
    })

    if (env.DISCORD_CUSTOMER_WEBHOOK && !env.TESTING) {
      if (priceId === LIVE_MONTHLY_PRICE_ID || priceId === TEST_MONTHLY_PRICE_ID) {
        http.postJson(env.DISCORD_CUSTOMER_WEBHOOK, {
          username: "Schlaufuchs",
          avatar_url: "",
          content: `**${userEmail}** just subscribed to the monthly plan for **$5.00**!`,
        })
      }
    }
  }


  return {
    body: {
      received: true
    }
  }
}

