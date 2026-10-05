// Coordonnées officielles issues de `assets/Textes site vitrine.pdf`.

export const contactEmail = 'hello@racineeyewear.com'

export const socialLinks = [
  {
    id: 'instagram',
    name: 'Instagram',
    label: 'Instagram RACINE',
    handle: '@racineeyewear',
    url: 'https://www.instagram.com/racineeyewear/',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'LinkedIn RACINE',
    handle: 'Carine Beyssac',
    url: 'https://www.linkedin.com/in/carine-beyssac-a87362146/',
  },
] as const

/** Photographes et vidéastes des images du site. */
export const mediaCredits = ['@jaydelinspiration', '@nthfly'] as const

export type SocialId = (typeof socialLinks)[number]['id']

/** Pages légales. Le site n'utilisant aucun cookie, il n'a pas de page dédiée. */
export const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  {
    label: 'Politique de confidentialité',
    to: '/politique-de-confidentialite',
  },
] as const
