import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globalSetup: "./test/globalSetup.ts"
  }
})