// Coordonnées officielles issues de `assets/Textes site vitrine.pdf`.

export const contactEmail = 'hello@racineeyewear.com'

export type SocialId = 'instagram' | 'tiktok' | 'facebook' | 'linkedin'

export type SocialLink = {
  id: SocialId
  name: string
  /** Nom accessible du lien. */
  label: string
  /** Identifiant affiché sur la page Contact, quand il est connu. */
  handle?: string
  url: string
}

// TikTok et Facebook : liens fournis par la marque, sans leurs paramètres de suivi.
export const socialLinks: readonly SocialLink[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    label: 'Instagram RACINE',
    handle: '@racineeyewear',
    url: 'https://www.instagram.com/racineeyewear/',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    label: 'TikTok RACINE',
    handle: '@racineeyewear',
    url: 'https://www.tiktok.com/@racineeyewear',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    label: 'Facebook RACINE',
    url: 'https://www.facebook.com/share/14uqZaUr4uq/',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'LinkedIn RACINE',
    handle: 'Carine Beyssac',
    url: 'https://www.linkedin.com/in/carine-beyssac-a87362146/',
  },
]

/** Photographes et vidéastes des images du site. */
export const mediaCredits = ['@jaydelinspiration', '@nthfly'] as const

/** Pages légales. Le site n'utilisant aucun cookie, il n'a pas de page dédiée. */
export const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  {
    label: 'Politique de confidentialité',
    to: '/politique-de-confidentialite',
  },
] as const
