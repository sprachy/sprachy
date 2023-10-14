// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "cloudflare",
  },
  experimental: {
    externalVue: false
  },
  vue: {
    runtimeCompiler: true
  },
  modules: [
    '@nuxt/image-edge',
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
    faunaAdminKey: '',
    faunaDomain: '',
    faunaPort: '',
    faunaScheme: '',

    frontendBaseUrl: 'http://localhost:5999',

    discordSignupWebhook: '',
    discordDeployWebhook: '',

    googleCloudCredentials: '',

    public: {
      frontendBaseUrl: 'http://localhost:5999',
    }
  }
})
