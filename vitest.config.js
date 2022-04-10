/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { extractFromSvelteConfig } from "vitest-svelte-kit"

export default async function () {
  const extract = await extractFromSvelteConfig()
  return defineConfig({
    plugins: extract['plugins'],
    test: {
      globalSetup: "./test/globalSetup.ts",
      testTimeout: 30000
    }
  })
}
