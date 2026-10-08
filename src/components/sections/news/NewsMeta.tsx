import { articleCategories, type Article } from '../../../data/articles'

type NewsMetaProps = {
  article: Article
  /** Date complète sur les cartes, année seule en tête d'article. */
  date?: 'full' | 'year'
}

/** Sur-titre d'un article : « Presse — Octobre 2026 ». */
export function NewsMeta({ article, date = 'full' }: NewsMetaProps) {
  return (
    <p className="news-meta">
      <span>{articleCategories[article.category]}</span>
      <span aria-hidden="true" className="news-meta__rule" />
      <time
        dateTime={date === 'full' ? article.date.slice(0, 7) : article.year}
      >
        {date === 'full' ? article.dateLabel : article.year}
      </time>
    </p>
  )
}
