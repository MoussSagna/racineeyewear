import { useEffect } from 'react'

/**
 * Remplace la meta description du document le temps de la page, puis rend
 * celle d'`index.html` : une seule balise, jamais de doublon.
 */
export function usePageDescription(description: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (!meta || !description) return

    const previous = meta.content
    meta.content = description
    return () => {
      meta.content = previous
    }
  }, [description])
}
