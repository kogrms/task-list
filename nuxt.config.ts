// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-svgo'
  ],
  css: ['~/assets/fonts/fonts.css'],
  svgo: {
    autoImportPath: './assets/images/'
  }
})
