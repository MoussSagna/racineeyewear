import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../../../data/articles'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { NewsMeta } from './NewsMeta'

type NewsListProps = {
  articles: Article[]
}

/** Les articles qui suivent la une. La section n'existe pas tant qu'il n'y en a pas. */
export function NewsList({ articles }: NewsListProps) {
  if (articles.length === 0) return null

  return (
    <section aria-labelledby="news-list-title" className="news-list">
      <h2 className="news-kicker" id="news-list-title">
        Toutes les actualités
      </h2>
      <ul className="news-list__items">
        {articles.map((article, index) => (
          <li key={article.slug}>
            <ScrollReveal delay={(index % 3) * 0.08}>
              <article className="news-item">
                <div className="news-item__media">
                  <img
                    alt={article.image.alt}
                    decoding="async"
                    height={article.image.height}
                    loading="lazy"
                    src={article.image.src}
                    width={article.image.width}
                  />
                </div>
                <div className="news-item__copy">
                  <NewsMeta article={article} />
                  <h3 className="news-item__title">
                    <Link to={`/actualites/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="news-item__excerpt">{article.excerpt}</p>
                  <p aria-hidden="true" className="news-item__cta">
                    Lire l’article
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </p>
                </div>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
