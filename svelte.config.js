import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'
import { isoImport } from 'vite-plugin-iso-import'
import { resolve } from "path"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },

    vite: {
      plugins: [
        // This allows server-only or client-only imports like
        // import { bar } from './server-module?server'
        isoImport()
      ],
      server: {
        port: 5999
      },
      define: {
        // For server-side secrets
        // https://scottspence.com/posts/sveltekit-env-secrets
        'process.env': process.env,

        global: {}
      },
    }
  }
}

export default config
