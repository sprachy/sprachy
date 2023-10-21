// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/learn': { ssr: false },
    '/logout': { ssr: false }
  },
  nitro: {
    preset: "cloudflare_pages",
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ["/api", "/login?next", "/signup?next", "/dev"]
    }
  },
  content: {
    navigation: {
      fields: ['id', 'shortdesc']
    }
  },
  modules: [
    '@nuxt/content',
    'nuxt-vitest'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Sprachy',
      meta: [
        {
          name: 'theme-color',
          content: '#f7cf71'
        }
      ]
    }
  },
  alias: {
    '~': __dirname
  },
  vite: {
    // Stop vite messing with the terminal output
    clearScreen: false
  },
  runtimeConfig: {
    frontendBaseUrl: 'http://localhost:5999',

    discordSignupWebhook: '',
    discordDeployWebhook: '',

    googleCloudCredentials: '',

    public: {
      frontendBaseUrl: 'http://localhost:5999',
      imagesBaseUrl: 'https://images.sprachy.com'
    }
  }
})
