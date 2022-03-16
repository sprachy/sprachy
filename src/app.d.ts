/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface Locals {
    session: {
      userId: string
      sessionKey: string
    } | null
  }

  // interface Platform {}

  interface Session {
    userId: string
  }

  // interface Stuff {}
}
