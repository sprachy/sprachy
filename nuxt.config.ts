// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~': __dirname
  },
  nitro: {
    preset: "cloudflare"
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
  },
})
