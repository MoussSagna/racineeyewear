import { useEffect, useState } from 'react'

type HideOnScrollOptions = {
  /** En deçà de cette position, le header reste toujours visible. */
  topOffset?: number
  /** Déplacement minimal pour prendre en compte un changement de direction. */
  threshold?: number
}

/**
 * Indique si le header doit sortir de l'écran : caché quand la page descend,
 * de retour dès qu'elle remonte, toujours visible en haut de page.
 * L'état ne change qu'au changement de direction, pas à chaque pixel.
 */
export function useHideOnScroll({
  topOffset = 10,
  threshold = 8,
}: HideOnScrollOptions = {}) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let previousY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY <= topOffset) {
        previousY = currentY
        setIsHidden(false)
        return
      }
      // Les micro-mouvements s'accumulent jusqu'au seuil avant de compter.
      const delta = currentY - previousY
      if (Math.abs(delta) < threshold) return
      previousY = currentY
      setIsHidden(delta > 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [topOffset, threshold])

  return isHidden
}
