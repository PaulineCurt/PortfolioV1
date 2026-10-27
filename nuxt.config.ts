// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  // Police auto-hébergée (pas d'appel à Google Fonts)
  css: ['@fontsource-variable/archivo/wdth.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Pauline, développeuse front-end Vue et Nuxt',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            "Portfolio de Pauline, développeuse front-end Vue et Nuxt : des interfaces soignées, du composant jusqu'à l'endpoint.",
        },
        { name: 'theme-color', content: '#F4F4F2' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  nitro: {
    // Les pages projet sont trouvées en suivant les liens de l'accueil
    prerender: { routes: ['/'], crawlLinks: true },
  },
})
