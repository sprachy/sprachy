import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    globalSetup: "./test/globalSetup.ts"
  }
})