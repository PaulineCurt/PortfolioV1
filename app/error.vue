<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '~/data/site'

// Page shown for an unknown URL (404) or any other error: header, then a single screen,
// no contact band (the header's "Contact" link points to the home page's).
// On a 404, the title collapses and its letters can be thrown around (FallingTitle).
const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.statusCode === 404)
const content = computed(() => (notFound.value ? site.errors.notFound : site.errors.generic))

useHead({ title: () => `${content.value.title.join(' ')} · ${site.name}` })

// clearError resets Nuxt's error state before going back home
const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <a class="skip-link pill pill-solid" href="#contenu">Aller au contenu</a>
  <div class="error-page">
    <SiteHeader contact-href="/#contact" />
    <main id="contenu">
      <section class="wrap error" :class="{ 'is-stage': notFound }" aria-labelledby="error-title">
        <p class="muted small">{{ content.label }}</p>
        <h1 id="error-title" class="display error-title">
          <FallingTitle v-if="notFound" :lines="content.title" />
          <BouncyText v-else :lines="content.title" />
        </h1>
        <div class="error-body">
          <p class="lead error-text">{{ content.text }}</p>
          <a class="pill pill-solid pill-lg" href="/" @click.prevent="goHome">{{ site.errors.back }}</a>
        </div>
      </section>
    </main>
  </div>
  <CustomCursor />
</template>

<style scoped>
.error {
  padding-top: clamp(48px, 8vw, 96px);
  padding-bottom: 120px;
}

/* Header + stage on exactly one screen: the stage takes all the remaining height */
.error-page {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

.error-page main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* On a 404, the section acts as floor and walls for the falling letters */
.is-stage {
  flex: 1;
  position: relative;
  overflow: hidden;
  padding-bottom: 0;
}

.error-title {
  margin-top: 16px;
  font-size: clamp(56px, 10vw, 150px);
}

.is-grabbing {
  user-select: none;
}

/* The text and button stay above the letters, even when letters are thrown on them */
.error-body {
  position: relative;
  z-index: 9999;
  width: fit-content;
}

.error-text {
  max-width: 34ch;
  margin: 40px 0 32px;
}
</style>
