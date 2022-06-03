/// <reference types="@sveltejs/kit" />
/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface SprachyEnvironment {
    STORE?: KVNamespace
    TESTING?: string
    FRONTEND_BASE_URL?: string
    FAUNA_ADMIN_KEY?: string
    FAUNA_DOMAIN?: string
    FAUNA_PORT?: string
    FAUNA_SCHEME?: string
    MAILGUN_SECRET?: string
    DISCORD_SIGNUP_WEBHOOK?: string
    DISCORD_CUSTOMER_WEBHOOK?: string
    STRIPE_SECRET_KEY?: string
    GOOGLE_TTS_API_SECRET?: string
  }

  interface Locals {
    session: {
      userId: string
      sessionKey: string
    } | null
  }

  /**
   * Type definitions for Cloudflare Workers platform.
   * Provided by CF in production, we mock it through hooks in dev.
   * https://www.npmjs.com/package/@sveltejs/adapter-cloudflare-workers
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
