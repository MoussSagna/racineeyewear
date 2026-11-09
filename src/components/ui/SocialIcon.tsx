import type { ReactNode } from 'react'
import type { SocialId } from '../../data/contact'

type SocialIconProps = {
  id: SocialId
  size?: number
}

/** Tracés au trait, sur une grille de 24 px. */
const paths: Record<SocialId, ReactNode> = {
  instagram: (
    <>
      <rect height="20" rx="5" width="20" x="2" y="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  tiktok: (
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2V3h4.083A6.005 6.005 0 0 0 21 7.917z" />
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect height="12" width="4" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
}

/**
 * Pictogrammes des réseaux sociaux, au trait fin. lucide-react ne fournit plus
 * d'icônes de marques : elles sont dessinées ici dans le même style.
 */
export function SocialIcon({ id, size = 24 }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="social-icon"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[id]}
    </svg>
  )
}
