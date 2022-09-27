import { browser } from "$app/env"
import { goto } from "$app/navigation"
import sprachy from "$lib/sprachy"
import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ parent }) => {
  if (browser && sprachy.spa) {
    goto("/learn")
  } else if (!browser) {
    const { userId } = await parent()
    if (userId) {
      throw redirect(303, "/learn")
    }
  }
}