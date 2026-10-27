<script setup lang="ts">
import { site, skills, stack } from '~/data/site'
import { projects } from '~/data/projects'
</script>

<template>
  <main id="contenu">
    <section id="top" class="wrap hero" aria-labelledby="hero-title">
      <div class="hero-main">
        <h1 id="hero-title" class="display hero-title">
          <template v-for="(line, i) in site.headline" :key="line">
            {{ line }}<br v-if="i < site.headline.length - 1" />
          </template>
        </h1>
        <p class="lead intro">{{ site.intro }}</p>
        <div class="actions hero-actions">
          <a class="pill pill-solid pill-lg" href="#projets">Voir les projets</a>
          <a class="pill pill-lg" href="#contact">Me contacter</a>
          <a v-if="site.cv" class="pill pill-lg" :href="site.cv" download>Mon CV</a>
        </div>
      </div>

      <aside class="card now" :aria-label="site.now.label">
        <img class="portrait" :src="site.photo" :alt="`Portrait de ${site.name}`" width="400" height="400" />
        <p class="now-label">{{ site.now.label }}</p>
        <p class="now-text">{{ site.now.text }}</p>
        <ul class="plain-list now-meta">
          <li>{{ site.location }}</li>
          <li v-if="site.availability">{{ site.availability }}</li>
        </ul>
      </aside>
    </section>

    <StackMarquee :items="stack" />

    <section id="projets" class="wrap projects" aria-labelledby="projets-title">
      <div class="section-head">
        <h2 id="projets-title" class="display section-title">Projets</h2>
        <p class="muted">Trois projets où j'ai pris en charge l'interface de bout en bout, de la conception au code.</p>
      </div>

      <article v-for="p in projects" :id="p.slug" :key="p.slug" class="split project" :aria-labelledby="`${p.slug}-title`">
        <div class="project-text">
          <p class="muted small">{{ p.context }}</p>
          <h3 :id="`${p.slug}-title`" class="display project-title">{{ p.title }}</h3>
          <p class="summary">{{ p.summary }}</p>
          <ul class="plain-list stack-list">
            <li v-for="t in p.stack" :key="t">{{ t }}</li>
          </ul>
          <div v-if="p.details || p.link" class="actions project-actions">
            <NuxtLink v-if="p.details" class="pill pill-solid" :to="`/projets/${p.slug}`">
              Voir le projet<span class="visually-hidden"> {{ p.title }}</span>
            </NuxtLink>
            <a v-if="p.link" class="pill" :href="p.link.href" target="_blank" rel="noopener">
              {{ p.link.label }}
            </a>
          </div>
        </div>
        <!-- Sur l'accueil, seulement le logo : les visuels sont sur la page du projet -->
        <ProjectMedia :logo="p.logo" :tint="p.tint" ratio="16 / 10" :placeholder="p.title" />
      </article>
    </section>

    <section class="wrap skills" aria-labelledby="skills-title">
      <h2 id="skills-title" class="display section-title">Ce que je fais</h2>
      <div class="skills-grid">
        <div v-for="s in skills" :key="s.title" class="card skill">
          <h3 class="caps">{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </div>
      </div>
    </section>

    <ContactSection />
  </main>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 48px;
  align-items: end;
  padding-top: clamp(40px, 6vw, 72px);
  padding-bottom: 96px;
}

.hero-title {
  font-size: clamp(52px, 8.6vw, 132px);
}

.intro {
  max-width: 34ch;
  margin-top: 40px;
}

.hero-actions {
  margin-top: 32px;
}

.now {
  gap: 12px;
}

.portrait {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

.now-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
}

.now-text {
  font-size: 18px;
  line-height: 1.45;
  color: var(--ink);
}

.now-meta {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  font-size: 15px;
  color: var(--ink-2);
}

.projects {
  padding-top: 120px;
  padding-bottom: 40px;
}

.section-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 64px;
}

.section-head .muted {
  max-width: 36ch;
}

.project {
  border-top: 1px solid var(--line);
  padding: 40px 0 72px;
  scroll-margin-top: 24px;
}

.project-title {
  font-size: clamp(48px, 5vw, 64px);
  margin-top: 12px;
}

.summary {
  margin-top: 20px;
  max-width: 42ch;
}

.stack-list {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 40px;
  font-size: 15px;
  color: var(--ink-2);
}

.project-actions {
  margin-top: 28px;
}

.skills {
  padding-top: 80px;
  padding-bottom: 120px;
}

.skills .section-title {
  margin-bottom: 56px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.skill {
  min-height: 280px;
}

.skill h3 {
  font-size: 28px;
  line-height: 1;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    padding-bottom: 72px;
  }
  .skills-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .skill {
    min-height: 0;
  }
}
</style>
