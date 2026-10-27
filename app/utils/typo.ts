// Typographie française : une espace insécable avant « : ; ! ? » et à l'intérieur des guillemets,
// pour qu'une ponctuation ne se retrouve jamais seule en début de ligne.
// Appliquée une fois aux données (site.ts, projects.ts) : les textes restent écrits normalement.

const NBSP = ' '

function fixSpaces(text: string): string {
  return text
    .replace(/ +([:;!?»])/g, `${NBSP}$1`)
    .replace(/« +/g, `«${NBSP}`)
}

// Parcourt récursivement objets et tableaux et corrige chaque chaîne
export function frenchSpacing<T>(value: T): T {
  if (typeof value === 'string') return fixSpaces(value) as T
  if (Array.isArray(value)) return value.map(frenchSpacing) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, frenchSpacing(v)])) as T
  }
  return value
}
