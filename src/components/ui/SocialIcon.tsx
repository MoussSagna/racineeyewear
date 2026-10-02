import type { SocialId } from '../../data/contact'

type SocialIconProps = {
  id: SocialId
  size?: number
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
      {id === 'instagram' ? (
        <>
          <rect height="20" rx="5" width="20" x="2" y="2" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </>
      ) : (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect height="12" width="4" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </>
      )}
    </svg>
  )
}
