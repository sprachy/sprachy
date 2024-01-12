import listImages from './dev/api/listImages.get'
import uploadImage from './dev/api/uploadImage.post'
import deleteImage from './dev/api/deleteImage.post'

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
    },
    devHandlers: [
      {
        route: '/api/dev/listImages',
        handler: listImages
      },
      {
        route: '/api/dev/uploadImage',
        handler: uploadImage
      },
      {
        route: '/api/dev/deleteImage',
        handler: deleteImage
      }
    ]
  },
  content: {
    navigation: {
      fields: ['id', 'shortdesc']
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/test-utils/module'
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
