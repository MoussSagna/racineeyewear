import { useCallback, useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/**
 * Indique si la page a défilé au-delà de `threshold` pixels.
 * Le composant ne se re-rend que lorsque le seuil est franchi.
 */
export function useScrolled(threshold = 24) {
  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  )

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
