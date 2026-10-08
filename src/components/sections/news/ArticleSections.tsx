import type { ArticleSection } from '../../../data/articles'
import { ScrollReveal } from '../../ui/ScrollReveal'

type ArticleSectionsProps = {
  sections: ArticleSection[]
  /** Rang du premier chapitre du groupe dans l'article. */
  startIndex: number
}

/** Chapitres de l'article : titre numéroté à gauche, texte large à droite. */
export function ArticleSections({
  sections,
  startIndex,
}: ArticleSectionsProps) {
  if (sections.length === 0) return null

  return (
    <div className="article-body">
      {sections.map((section, index) => (
        <section
          aria-labelledby={`article-${section.id}`}
          className="article-chapter"
          key={section.id}
        >
          <ScrollReveal className="article-chapter__heading">
            <p aria-hidden="true" className="article-chapter__index">
              {String(startIndex + index + 1).padStart(2, '0')}
            </p>
            <h2 className="article-chapter__title" id={`article-${section.id}`}>
              {section.title}
            </h2>
          </ScrollReveal>
          <div className="article-chapter__content">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <ScrollReveal
                delay={0.08 + paragraphIndex * 0.06}
                key={paragraph}
              >
                <p className="article-text">{paragraph}</p>
              </ScrollReveal>
            ))}
            {section.quote && (
              <ScrollReveal delay={0.16}>
                <figure className="article-quote">
                  <blockquote>
                    <p>«&nbsp;{section.quote.text}&nbsp;»</p>
                  </blockquote>
                  <figcaption>{section.quote.author}</figcaption>
                </figure>
              </ScrollReveal>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
