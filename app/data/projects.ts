import { frenchSpacing } from '~/utils/typo'

export interface Screen {
  src: string
  alt: string
}

export interface Capture extends Screen {
  caption: string
}

export interface ProcessStep {
  title: string
  text: string
}

export interface ProjectDetails {
  lead: string
  role: string
  status: string
  intro: { title: string; text: string }
  note?: string
  captures?: Capture[]
  features?: { title: string; items: string[] }[]
  highlights?: { title: string; items: { title: string; text: string }[] }
  stack: { label: string; value: string }[]
  next?: string
}

export interface Project {
  slug: string
  title: string
  context: string
  tagline: string // short sentence: home list and top of the project page
  stack: string[]
  tint: string
  logo?: string
  screens?: Screen[]
  link?: { label: string; href: string }
  process?: ProcessStep[]
  details?: ProjectDetails
}

export const projects: Project[] = frenchSpacing([
  {
    slug: 'equilib',
    title: 'EquiLib',
    context: 'Projet personnel, conçu et développé seule',
    tagline: 'La prise de rendez-vous vétérinaire, pensée pour les chevaux',
    stack: ['Nuxt 4', 'Laravel 13', 'PostgreSQL', 'Docker', 'PWA'],
    tint: '#cfdcd3',
    logo: '/projets/equilib/logo.webp',
    details: {
      lead:
        "Application full-stack inspirée de Doctolib, conçue pour le monde équin. Elle met en relation deux types d'utilisateurs, chacun avec son propre espace : les propriétaires et les vétérinaires.",
      role: 'Conception, front, API et DevOps',
      status: 'Démarré en décembre 2025',
      intro: {
        title: 'Le projet',
        text:
          "Les propriétaires y trouvent un vétérinaire équin, réservent une consultation selon les créneaux réellement disponibles et suivent le dossier de leurs chevaux. Les vétérinaires y gèrent leur agenda, leurs patients et leur facturation. Une première version avait été développée en Symfony pendant ma formation ; je l'ai réécrite en Laravel, le framework que j'utilise au travail.",
      },
      captures: [
        {
          src: '/projets/equilib/tableau-de-bord.webp',
          alt: "Tableau de bord vétérinaire : rendez-vous en attente, chiffres du mois, calendrier et consultations du jour",
          caption: 'Tableau de bord du vétérinaire',
        },
        {
          src: '/projets/equilib/recherche.webp',
          alt: 'Recherche de vétérinaires par nom, spécialité et zone géographique, avec les fiches des résultats',
          caption: 'Recherche de vétérinaires, côté propriétaire',
        },
        {
          src: '/projets/equilib/rendez-vous.webp',
          alt: 'Formulaire de prise de rendez-vous : vétérinaire, cheval et catégories de motif de consultation',
          caption: 'Prise de rendez-vous et motif de consultation',
        },
        {
          src: '/projets/equilib/statistiques.webp',
          alt: 'Statistiques du vétérinaire : chiffres clés, rendez-vous par type et par statut, évolution mensuelle',
          caption: "Statistiques d'activité",
        },
      ],
      features: [
        {
          title: 'Côté propriétaire',
          items: [
            'Recherche de vétérinaires par spécialité et localisation, avec une carte interactive',
            'Prise de rendez-vous en ligne selon les créneaux réellement disponibles',
            'Gestion de ses chevaux : fiche, vaccinations, documents',
            'Messagerie avec le vétérinaire, rattachée à chaque rendez-vous',
          ],
        },
        {
          title: 'Côté vétérinaire',
          items: [
            "Tableau de bord de l'activité et statistiques avec graphiques",
            "Gestion de l'agenda : disponibilités, jours d'indisponibilité, paramètres des consultations",
            'Suivi des patients et de leurs dossiers médicaux',
            'Facturation et messagerie avec les propriétaires',
          ],
        },
      ],
      highlights: {
        title: 'Les défis',
        items: [
          {
            title: 'Créneaux disponibles',
            text:
              'Calculer les créneaux libres à partir des disponibilités, des indisponibilités et des rendez-vous existants.',
          },
          {
            title: 'Un domaine métier riche',
            text:
              'Modéliser les spécialités vétérinaires sur trois niveaux, les dossiers médicaux, les documents et les factures.',
          },
          {
            title: 'Nuxt et Laravel ensemble',
            text:
              'Faire fonctionner une SPA Nuxt avec une API Laravel : authentification Sanctum, SSR, proxy Docker.',
          },
          {
            title: 'Une PWA installable',
            text: 'Construire une Progressive Web App et sa stratégie de cache, avec une navigation adaptée au mobile.',
          },
        ],
      },
      stack: [
        { label: 'Backend', value: 'Laravel 13 · PHP 8.4 · API REST · authentification Sanctum · PostgreSQL 16' },
        { label: 'Frontend', value: 'Nuxt 4 · Vue 3 · Pinia · Tailwind CSS · ApexCharts · Leaflet (Interactive Maps)' },
        { label: 'Mobile', value: 'Progressive Web App installable, navigation adaptée au mobile' },
        { label: 'DevOps', value: 'Environnement dockerisé (PostgreSQL, Mailpit, Adminer) · CI GitHub Actions qui lance les tests à chaque push' },
        {
          label: 'Qualité',
          value: 'Tests sur les fonctionnalités clés : authentification, rendez-vous, disponibilités, chevaux, messagerie, profils',
        },
      ],
    },
  },
  {
    slug: 'cyclerun',
    title: 'CycleRun',
    context: 'Projet personnel, conçu et développé seule',
    tagline: "L'app de course qui s'adapte à ton cycle",
    stack: ['React Native', 'Expo', 'Laravel 13', 'PostgreSQL', '233 tests'],
    tint: '#ecd3d6',
    logo: '/projets/cyclerun/logo.webp',
    screens: [
      { src: '/projets/cyclerun/accueil.webp', alt: "Écran d'accueil de CycleRun : phase du cycle en cours et séance du jour" },
      { src: '/projets/cyclerun/calendrier.webp', alt: 'Calendrier du cycle, chaque jour coloré selon sa phase' },
      { src: '/projets/cyclerun/entrainement.webp', alt: "Écran Entraînement : objectif 5 km et prochaine séance avec l'allure cible" },
      { src: '/projets/cyclerun/profil.webp', alt: "Profil : durées du cycle et des règles calculées à partir de l'historique" },
    ],
    details: {
      lead:
        "Application mobile de coaching running dont le plan d'entraînement s'ajuste au cycle menstruel. Projet perso conçu et développé seule, du design à l'API.",
      role: 'Conception, design, mobile et API',
      status: 'En développement',
      intro: {
        title: 'Le constat',
        text:
          "Les apps de course proposent des plans identiques d'une semaine à l'autre, comme si l'énergie, la récupération et la douleur étaient constantes tout au long du mois. Pour une coureuse, elles ne le sont pas. CycleRun part de là : un plan 5 km construit sur une méthodologie d'entraînement publiée, qui se module selon la phase du cycle.",
      },
      features: [
        {
          title: 'Suivi du cycle',
          items: [
            'Saisie des règles et calendrier du cycle, avec les phases (menstruelle, folliculaire, ovulatoire, lutéale)',
            'Durée de cycle apprise pour chaque utilisatrice à partir de son historique, jamais un « 28 jours » par défaut',
            "Détection des cycles irréguliers : quand les données ne suffisent pas, l'app le dit au lieu de prédire avec une fausse précision",
            "Écran d'analyse : variabilité, régularité, historique et prévisions",
            'Ressenti du jour : flux, douleur, énergie, une vingtaine de symptômes, notes libres',
            "Périodes d'exclusion (grossesse, allaitement) pour ne pas fausser les statistiques",
          ],
        },
        {
          title: "Plan d'entraînement 5 km",
          items: [
            'Formulaire de création en deux étapes, avec trois niveaux déclarés : débutante, intermédiaire, confirmée',
            "Allures calculées à partir de la VMA ou d'un temps de course (formules de Daniels et de Riegel)",
            'Périodisation en trois blocs (base, développement, affûtage), avec des semaines allégées et une répartition 80/20 entre endurance et intensité',
            'Départ en course/marche pour les débutantes, garde-fous de sécurité sur la progression du volume',
            "Indicateur de faisabilité de l'objectif : si la cible est trop ambitieuse, l'app propose un temps réaliste ou un plan plus long",
            'Adaptation au cycle : charge allégée en phase lutéale et pendant les règles, séance à reporter si la douleur est forte',
            "Suivi des séances (faites, sautées ou déplacées) avec ressenti de l'effort, durée et distance",
          ],
        },
      ],
      highlights: {
        title: "Choix d'architecture",
        items: [
          {
            title: 'Deux moteurs séparés',
            text:
              "Le suivi du cycle est purement calendaire et statistique, et le plan est généré à partir d'une méthodologie encodée et testée. Aucune IA ne calcule le cycle ni ne construit le plan.",
          },
          {
            title: 'Seuls les faits sont stockés',
            text:
              "La base ne garde que ce que l'utilisatrice a déclaré. Phases et prévisions sont recalculées à chaque lecture, jamais figées.",
          },
          {
            title: 'Données de santé sensibles',
            text:
              "Traitées comme telles (RGPD, art. 9) : consentement détaillé à l'inscription, suppression définitive et en cascade, aucun traceur tiers.",
          },
        ],
      },
      stack: [
        { label: 'Mobile', value: 'React Native 0.88 · Expo SDK 58 · TypeScript · Expo Router · NativeWind (Tailwind) · Reanimated · React Compiler' },
        { label: 'Backend', value: 'Laravel 13 · PHP 8.4 · API REST · authentification Sanctum' },
        { label: 'Données', value: 'PostgreSQL 16 (jsonb)' },
        { label: 'Qualité', value: '233 tests PHPUnit sur une vraie base Postgres isolée · CI GitHub Actions · ESLint · Pint' },
        { label: 'Environnement', value: 'Docker Compose (Postgres + Adminer)' },
      ],
      next:
        "Le suivi du cycle et le plan 5 km fonctionnent de bout en bout. Prochaine étape : faire valider les paramètres d'entraînement par un coach diplômé FFA avant toute mise en ligne.",
    },
  },
  {
    slug: 'smile',
    title: 'Smile',
    context: 'Refonte UX/UI et intégration, projet professionnel',
    tagline: 'Une refonte UX/UI, de la maquette à la production',
    stack: ['UX/UI', 'Design system', 'Nuxt'],
    tint: '#d3dbea',
    logo: '/projets/smile/logo.webp',
    process: [
      {
        title: 'Garder le parcours, clarifier le reste',
        text: "Le parcours utilisateur de la V1 fonctionnait : je l'ai conservé et j'ai concentré la refonte sur ce qui manquait de cohérence et de clarté.",
      },
      {
        title: "Des résultats lisibles d'un coup d'œil",
        text: "Les questionnaires sont regroupés par thème, chacun avec son icône et une couleur qui le suit d'un écran à l'autre. Pour chaque résultat, un graphique situe le score dans sa plage.",
      },
      {
        title: "L'UX/UI de bout en bout",
        text: "Couleurs, composants, écrans : j'ai défini toute l'interface et l'ai maquettée sur Figma, pour que chaque écran reste cohérent avec les autres.",
      },
      {
        title: 'Intégrée en Nuxt',
        text: "J'ai ensuite intégré moi-même la refonte dans l'application existante. Elle est aujourd'hui en production, avec de bons retours.",
      },
    ],
    details: {
      lead:
        "Une application web d'auto-évaluation en santé mentale destinée aux étudiants d'une université. J'ai repris seule son interface, des maquettes jusqu'à l'intégration en Nuxt.",
      role: 'UX/UI et intégration Nuxt, en solo',
      status: 'En production',
      intro: {
        title: 'Le contexte',
        text:
          "La V1 était sortie en production dans l'urgence. Son parcours utilisateur fonctionnait : la refonte l'a conservé et s'est concentrée sur ce qui manquait de cohérence et de clarté, à commencer par la présentation des résultats des questionnaires.",
      },
      note: "Projet réalisé dans le cadre de mon emploi : l'application est confidentielle, d'où l'absence de captures.",
      stack: [
        { label: 'Conception', value: "UX/UI de bout en bout · système visuel (couleurs, icônes, composants) · maquettes Figma" },
        { label: 'Intégration', value: "Nuxt, dans l'application existante" },
      ],
      next: "La refonte est intégrée dans l'application existante et les retours sont bons.",
    },
  },
])
