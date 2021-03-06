import adapterCloudflareWorkers from '@sveltejs/adapter-cloudflare-workers'
import preprocess from 'svelte-preprocess'
import { isoImport } from 'vite-plugin-iso-import'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapterCloudflareWorkers(),

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
      ssr: {
        // Fix production SSR build error related to fontawesome
        // https://github.com/sveltejs/kit/issues/928
        noExternal: ['@fortawesome/free-brands-svg-icons', '@fortawesome/free-regular-svg-icons', '@fortawesome/free-solid-svg-icons']
      },
      // optimizeDeps: {
      //   include: ["@fortawesome/free-solid-svg-icons"]
      // }
    }
  }
}

export default config
