import { ArrowUpRight, Headphones, Newspaper } from 'lucide-react'
import type {
  ArticleCoverage as ArticleCoverageData,
  ArticleLink,
} from '../../../data/articles'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { SocialIcon } from '../../ui/SocialIcon'

type ArticleCoverageProps = {
  coverage: ArticleCoverageData
}

function LinkIcon({ icon }: Pick<ArticleLink, 'icon'>) {
  if (icon === 'listen') {
    return <Headphones aria-hidden="true" size={18} strokeWidth={1.4} />
  }
  if (icon === 'read') {
    return <Newspaper aria-hidden="true" size={18} strokeWidth={1.4} />
  }
  return <SocialIcon id={icon} size={18} />
}

/**
 * Passage de RACINE dans un média : la fiche (média, émission, date…) et les
 * liens vers le contenu d'origine, ouverts dans un nouvel onglet.
 */
export function ArticleCoverage({ coverage }: ArticleCoverageProps) {
  const [primary, ...others] = coverage.links

  return (
    <section
      aria-labelledby="article-coverage-title"
      className="article-coverage"
    >
      <ScrollReveal className="article-coverage__heading">
        <h2 className="news-kicker" id="article-coverage-title">
          {coverage.title}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <dl className="article-coverage__facts">
          {coverage.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>

      <ScrollReveal className="article-coverage__actions" delay={0.16}>
        {primary && (
          <a
            className="arrow-link arrow-link--pill arrow-link--dark article-coverage__primary"
            href={primary.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkIcon icon={primary.icon} />
            <span>
              {primary.label}{' '}
              <span className="visually-hidden">(nouvel onglet)</span>
            </span>
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </a>
        )}
        {others.length > 0 && (
          <ul className="article-coverage__links">
            {others.map((link) => (
              <li key={link.url}>
                <a
                  className="article-coverage__link"
                  href={link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkIcon icon={link.icon} />
                  <span>
                    {link.label}{' '}
                    <span className="visually-hidden">(nouvel onglet)</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="article-coverage__arrow"
                    size={16}
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </ScrollReveal>
    </section>
  )
}
