export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: '/Alula',
    head: {
      title: 'ALULA',
      meta: [
        { name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Alula/dessins/circles/color-red.png' },
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  ssr: true,
  nitro: {
    preset: "static",
  }
})