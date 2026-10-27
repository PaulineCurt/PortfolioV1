import { frenchSpacing } from '~/utils/typo'

export const site = frenchSpacing({
  name: 'Pauline',
  fullName: 'Pauline Curt',
  headline: ['Développeuse', 'front-end', 'Vue et Nuxt'],
  contactTitle: ['On en', 'parle ?'],
  // Error page (app/error.vue)
  errors: {
    notFound: {
      label: 'Erreur 404',
      title: ['Page', 'introuvable'],
      text: "Visiblement, cette page s'est effondrée. Tu peux essayer de la remettre d'aplomb, ou rentrer à l'accueil.",
    },
    generic: {
      label: 'Erreur',
      title: ['Oups'],
      text: "Quelque chose s'est mal passé. Réessaie depuis l'accueil.",
    },
    back: "Retour à l'accueil",
  },
  intro:
    "Je construis des interfaces soignées, du composant jusqu'à l'endpoint, et je teste ce que je livre.",
  location: 'Basée à Aix-Marseille',
  availability: '',
  email: 'curtpauline@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pauline-curt-488a52254/',
  cv: '/cv-pauline.pdf',
  photo: '/pauline.webp',
  now: {
    label: 'Mon poste actuel',
    text:
      'Développeuse dans une MedTech, sur une plateforme médicale marquée CE : Nuxt, TypeScript et tests de bout en bout avec Playwright.',
  },
})

export const stack = ['Nuxt', 'Vue', 'TypeScript', 'Tailwind', 'Laravel', 'Symfony', 'PostgreSQL', 'Playwright']

export const skills = frenchSpacing([
  {
    title: 'Front-end',
    text:
      "Nuxt, Vue et TypeScript en production sur une plateforme médicale marquée CE. Architecture de composants, état partagé avec Pinia, rendu SSR ou statique selon le besoin.",
  },
  {
    title: 'Back-end',
    text:
      "Les API REST dont le front a besoin : Laravel en entreprise, Symfony pratiqué en formation, PostgreSQL. Authentification Sanctum, modélisation métier, données de santé traitées selon le RGPD.",
  },
  {
    title: 'Qualité et UX/UI',
    text:
      "Tests de bout en bout avec Playwright, PHPUnit et CI GitHub Actions. Et l'interface pensée de la maquette jusqu'au composant intégré, avec un système visuel cohérent.",
  },
])
