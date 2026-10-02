type LegalProps = {
  title: string
}

/**
 * Page légale en attente : la route existe pour le footer, le texte juridique
 * sera fourni par la marque.
 */
export function Legal({ title }: LegalProps) {
  return (
    <section className="page-placeholder">
      <title>{`${title} — RACINE EYEWEAR`}</title>
      <h1>{title}</h1>
      <p>Cette page est en cours de rédaction.</p>
    </section>
  )
}
