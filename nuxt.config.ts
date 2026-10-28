// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  // Animated transition between the home page and project pages (View Transitions API).
  // Ignored by browsers that don't support it; disabled in CSS when the user prefers reduced motion.
  experimental: { viewTransition: true },
  // Self-hosted font (no request to Google Fonts)
  css: ['@fontsource-variable/archivo/wdth.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#F4F4F2' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  nitro: {
    // Project pages are found by following the home page links
    prerender: { routes: ['/'], crawlLinks: true },
  },
})
