type LegalTodoProps = {
  /** `validate` : décision à prendre ; `complete` : information à fournir. */
  kind?: 'complete' | 'validate'
  children: string
}

/**
 * Information juridique manquante, laissée visible tant que la marque ne l'a
 * pas fournie. Rien n'est inventé à sa place : à remplacer avant la mise en
 * production.
 */
export function LegalTodo({ kind = 'complete', children }: LegalTodoProps) {
  return (
    <mark className="legal-todo">
      [{kind === 'complete' ? 'À COMPLÉTER' : 'À VALIDER'} — {children}]
    </mark>
  )
}
