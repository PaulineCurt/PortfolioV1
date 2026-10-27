<script setup lang="ts">
import { site } from '~/data/site'
import { projects } from '~/data/projects'

const route = useRoute()
const found = projects.find((p) => p.slug === route.params.slug)

// Only projects with `details` get a page
if (!found?.details) {
  throw createError({ statusCode: 404, statusMessage: 'Projet introuvable', fatal: true })
}

const project = found
const details = found.details

// The back link targets the project we came from, so the transition finds it in place.
// Transition names shared with the home page: the title and the colour block morph into these.
// A name must be unique on the page: only the first colour block gets it.
const titleTransition = { viewTransitionName: `title-${project.slug}` }
const colorBlock = project.screens?.length ? 'screens' : details.captures?.length ? 'captures' : project.process ? 'process' : undefined
const blockTransition = (block: typeof colorBlock) =>
  block === colorBlock ? { viewTransitionName: `project-${project.slug}`, viewTransitionClass: 'project-block' } : undefined

useSeoMeta({
  title: `${project.title} — ${project.tagline} · ${site.name}`,
  description: details.lead,
})
</script>

<template>
  <main id="contenu">
    <article :aria-labelledby="`${project.slug}-title`">
      <header class="wrap hero">
        <NuxtLink class="pill back" :to="`/#${project.slug}`">← Tous les projets</NuxtLink>
        <p class="muted small context">{{ project.context }}</p>
        <div class="title-row">
          <h1 :id="`${project.slug}-title`" class="display hero-title" :style="titleTransition">{{ project.title }}</h1>
          <!-- Decorative: the project name is right next to it -->
          <img v-if="project.logo" class="hero-logo" :src="project.logo" alt="" />
        </div>
        <div class="split hero-foot">
          <div>
            <p class="lead tagline">{{ project.tagline }}</p>
            <a v-if="project.link" class="pill project-link" :href="project.link.href" target="_blank" rel="noopener">
              {{ project.link.label }}
            </a>
          </div>
          <dl class="facts">
            <div>
              <dt>Rôle</dt>
              <dd>{{ details.role }}</dd>
            </div>
            <div>
              <dt>Statut</dt>
              <dd>{{ details.status }}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{{ project.stack.join(' · ') }}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div v-if="project.screens?.length" class="wrap">
        <ul
          class="plain-list gallery"
          :style="{ background: project.tint, ...blockTransition('screens') }"
          aria-label="Captures d'écran"
        >
          <li v-for="s in project.screens" :key="s.src">
            <img :src="s.src" :alt="s.alt" width="780" height="1588" />
          </li>
        </ul>
      </div>

      <div v-if="details.captures?.length" class="wrap">
        <CaptureGallery :captures="details.captures" :tint="project.tint" :style="blockTransition('captures')" />
      </div>

      <div v-if="project.process" class="wrap">
        <ProcessSteps
          :steps="project.process"
          :tint="project.tint"
          :level="2"
          :style="blockTransition('process')"
        />
      </div>

      <p v-if="details.note" class="wrap muted small note">{{ details.note }}</p>

      <section class="wrap split block" aria-labelledby="intro-title">
        <h2 id="intro-title" class="display block-title">{{ details.intro.title }}</h2>
        <div class="block-body">
          <p class="lead">{{ details.lead }}</p>
          <p>{{ details.intro.text }}</p>
        </div>
      </section>

      <section v-if="details.features" class="wrap split block" aria-labelledby="features-title">
        <h2 id="features-title" class="display block-title">Fonctionnalités</h2>
        <div class="block-body">
          <div v-for="group in details.features" :key="group.title" class="feature-group">
            <h3 class="caps">{{ group.title }}</h3>
            <ul class="plain-list feature-list">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="details.highlights" class="wrap split block block-wide" aria-labelledby="highlights-title">
        <h2 id="highlights-title" class="display block-title">{{ details.highlights.title }}</h2>
        <div class="cards">
          <div v-for="c in details.highlights.items" :key="c.title" class="card">
            <h3 class="caps">{{ c.title }}</h3>
            <p>{{ c.text }}</p>
          </div>
        </div>
      </section>

      <section class="wrap split block" aria-labelledby="stack-title">
        <h2 id="stack-title" class="display block-title">Stack</h2>
        <dl class="block-body stack-table">
          <div v-for="row in details.stack" :key="row.label">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="details.next" class="wrap split block" aria-labelledby="statut-title">
        <h2 id="statut-title" class="display block-title">Statut</h2>
        <div class="block-body">
          <p class="lead">{{ details.status }}.</p>
          <p>{{ details.next }}</p>
        </div>
      </section>

      <div class="wrap back-bottom">
        <NuxtLink class="pill" :to="`/#${project.slug}`">← Tous les projets</NuxtLink>
      </div>
    </article>

    <ContactSection />
  </main>
</template>

<style scoped>
.hero {
  padding-top: clamp(24px, 4vw, 48px);
  padding-bottom: 56px;
}

.context {
  margin-top: 48px;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 16px 32px;
  margin-top: 12px;
}

.hero-title {
  font-size: clamp(64px, 14vw, 200px);
}

.hero-logo {
  width: auto;
  height: clamp(72px, 11vw, 168px);
}

.project-link {
  margin-top: 20px;
}

.hero-foot {
  margin-top: 48px;
}

.tagline {
  max-width: 28ch;
}

.facts {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.facts dt,
.stack-table dt {
  font-size: 14px;
  color: var(--muted);
}

.facts dd,
.stack-table dd {
  margin: 4px 0 0;
}

.gallery {
  padding: clamp(24px, 5vw, 72px);
  border-radius: var(--radius);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 2.5vw, 32px);
}

.gallery img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.note {
  margin-top: 16px;
}

.block {
  row-gap: 40px;
  padding-bottom: 72px;
}

/* Rule aligned with the content, not the gutter */
.block::before {
  content: '';
  grid-column: 1 / -1;
  border-top: 1px solid var(--line);
}

.block:first-of-type {
  margin-top: 96px;
}

.block-title {
  font-size: clamp(36px, 4.5vw, 56px);
}

.block-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 62ch;
}

.feature-group + .feature-group {
  margin-top: 16px;
}

.feature-group h3,
.card h3 {
  font-size: 24px;
}

.feature-list {
  margin-top: 16px;
}

.feature-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink-2);
}

.block-wide {
  grid-template-columns: minmax(0, 1fr);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.stack-table {
  margin: 0;
  gap: 0;
}

.stack-table div {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.stack-table dt {
  font-size: 15px;
  padding-top: 2px;
}

.stack-table dd {
  margin: 0;
}

.back-bottom {
  padding-bottom: 96px;
}

@media (max-width: 860px) {
  .block {
    row-gap: 24px;
  }
  .facts,
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }
  .facts {
    gap: 16px;
  }
  .block:first-of-type {
    margin-top: 64px;
  }
  /* On mobile, the screenshots scroll horizontally */
  .gallery {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 62%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 24px;
  }
  .gallery li {
    scroll-snap-align: start;
  }
  .stack-table div {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}
</style>
