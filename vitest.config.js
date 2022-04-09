/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globalSetup: "./test/globalSetup.ts"
  },
})
