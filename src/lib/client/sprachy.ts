
import { browser } from "$app/env"

import { SprachyAPIClient } from "$lib/client/SprachyAPIClient"
import { SprachySPA } from "$lib/client/spa"

declare const window: { spa?: SprachySPA }

export class SprachyFrontendSystem {
  spa: SprachySPA | null = null
  async initSPA() {
    this.spa = await SprachySPA.start()
    window.spa = this.spa
  }
}

const sprachy = browser ? new SprachyFrontendSystem() : null
export default sprachy