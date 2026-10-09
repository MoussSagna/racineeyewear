import { articleCategories, type Article } from '../../../data/articles'

type NewsMetaProps = {
  article: Article
  /** Date complète sur les cartes, année seule en tête d'article. */
  date?: 'full' | 'year'
}

/** Sur-titre d'un article : « Presse — Octobre 2026 », ou la catégorie seule sans date connue. */
export function NewsMeta({ article, date = 'full' }: NewsMetaProps) {
  const label = date === 'full' ? article.dateLabel : article.year

  return (
    <p className="news-meta">
      <span>{articleCategories[article.category]}</span>
      {label && (
        <>
          <span aria-hidden="true" className="news-meta__rule" />
          <time
            dateTime={
              date === 'full' ? article.date?.slice(0, 7) : article.year
            }
          >
            {label}
          </time>
        </>
      )}
    </p>
  )
}
