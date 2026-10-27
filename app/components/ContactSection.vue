<script setup lang="ts">
import { site } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div class="wrap">
      <h2 id="contact-title" class="display contact-title">
        <BouncyText :lines="site.contactTitle" />
      </h2>
      <div class="contact-row">
        <a class="mail" :href="`mailto:${site.email}`">{{ site.email }}</a>
        <div class="contact-links">
          <a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a v-if="site.cv" :href="site.cv" download>Mon CV</a>
        </div>
      </div>
      <footer class="foot">
        <span>{{ site.fullName }}, {{ year }}</span>
        <span>Codé en Nuxt</span>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--contact-bg);
  padding-top: 120px;
  padding-bottom: 56px;
}

.contact-title {
  font-size: clamp(64px, 12vw, 176px);
}

.contact-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 32px;
  margin-top: 56px;
}

.mail {
  font-size: clamp(24px, 3.5vw, 44px);
  font-weight: 700;
  text-underline-offset: 6px;
  overflow-wrap: anywhere;
}

.contact-links {
  display: flex;
  gap: 24px;
  font-weight: 600;
}

.foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 96px;
  padding-top: 24px;
  border-top: 1px solid var(--line-strong);
  font-size: 14px;
  color: #55534f;
}
</style>
