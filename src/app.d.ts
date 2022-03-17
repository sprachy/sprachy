/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface Locals {
    session: {
      userId: string
      sessionKey: string
    } | null
  }

  /**
   * Type definitions for Cloudflare Workers platform.
   * This stuff is only present in production.
   * https://www.npmjs.com/package/@sveltejs/adapter-cloudflare
   */
  interface Platform {
    env: {
      STORE: KVNamespace
    }
    context: {
      waitUntil(promise: Promise<any>): void
    }
  }

  /**
   * A SvelteKit Session is available on both the server and the client.
   * Defined by getSession in hooks.ts.
   * Don't put sensitive info in here!
   */
  interface Session {
    userId?: string
  }

  // interface Stuff {}
}
