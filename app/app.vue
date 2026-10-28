<script setup lang="ts">
import { site } from '~/data/site'

// Default title and description; project pages override them
const route = useRoute()

useSeoMeta({
  title: site.seo.title,
  description: site.seo.description,
})

useHead({ link: [{ rel: 'canonical', href: () => site.url + route.path }] })
</script>

<template>
  <a class="skip-link pill pill-solid" href="#contenu">Aller au contenu</a>
  <SiteHeader />
  <NuxtPage />
  <CustomCursor />
</template>
