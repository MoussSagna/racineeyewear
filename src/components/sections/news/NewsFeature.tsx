import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../../../data/articles'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { NewsMeta } from './NewsMeta'
import { PressClipping } from './PressClipping'

type NewsFeatureProps = {
  article: Article
}

/** L'article à la une : toute la carte mène à l'article, par le lien du titre. */
export function NewsFeature({ article }: NewsFeatureProps) {
  return (
    <section aria-labelledby="news-feature-title" className="news-feature">
      <ScrollReveal className="news-feature__heading" variant="fade">
        <p className="news-kicker">À la une</p>
      </ScrollReveal>

      <article className="news-feature__card">
        <div className="news-feature__media">
          <PressClipping image={article.image} showCaption={false} />
        </div>

        <div className="news-feature__copy">
          <ScrollReveal>
            <NewsMeta article={article} />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="news-feature__title" id="news-feature-title">
              <Link to={`/actualites/${article.slug}`}>{article.title}</Link>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="news-feature__excerpt">{article.excerpt}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <p aria-hidden="true" className="news-feature__cta">
              Lire l’article
              <ArrowRight size={16} strokeWidth={1.5} />
            </p>
          </ScrollReveal>
        </div>
      </article>
    </section>
  )
}
