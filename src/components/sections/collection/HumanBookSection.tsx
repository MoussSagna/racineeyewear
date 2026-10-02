import { collections, humanBook } from '../../../data/collections'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { CollectionPhoto } from './CollectionPhoto'

const pad = (value: number) => String(value).padStart(2, '0')

export function HumanBookSection() {
  const position = collections.findIndex((item) => item.id === humanBook.id) + 1

  return (
    <section
      aria-labelledby="collection-human-book-title"
      className="collection-book"
    >
      <div className="collection-book__header">
        <div>
          <ScrollReveal>
            <p className="collection-label">
              <span aria-hidden="true">
                {pad(position)} / {pad(collections.length)} —{' '}
              </span>
              Un autre univers RACINE
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="collection-book__title"
              id="collection-human-book-title"
            >
              {humanBook.title}
            </h2>
          </ScrollReveal>
        </div>
        <div className="collection-book__copy">
          <ScrollReveal delay={0.1}>
            <p className="collection-book__quote">{humanBook.quote}</p>
          </ScrollReveal>
          {humanBook.paragraphs.map((paragraph, index) => (
            <ScrollReveal delay={0.2 + index * 0.1} key={paragraph}>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ul
        aria-label="Portraits du Human Book"
        className="collection-book__gallery"
      >
        {humanBook.portraits.map((portrait, index) => (
          <li key={portrait.src}>
            <ScrollReveal
              className="collection-book__portrait"
              delay={(index % 4) * 0.1}
              variant="unveil"
            >
              <CollectionPhoto photo={portrait} />
            </ScrollReveal>
          </li>
        ))}
      </ul>

      <ScrollReveal>
        <p className="collection-book__invitation">{humanBook.invitation}</p>
      </ScrollReveal>
    </section>
  )
}
