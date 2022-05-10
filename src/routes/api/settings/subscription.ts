// import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"


// const updateSubscriptionForm = z.object({
//   subscriptionId: z.string()
// })
export const post: RequestHandler = async ({ request, locals }) => {
  // const { subscriptionId } = updateSubscriptionForm.parse(await request.json())
  return {
    body: {
      success: true
    }
  }
}