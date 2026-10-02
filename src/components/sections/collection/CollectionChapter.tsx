import { allPower, featuredChapter } from '../../../data/collections'
import { cn } from '../../../lib/utils'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function CollectionChapter() {
  const { title, chapter, chapterNote } = featuredChapter

  return (
    <section
      aria-labelledby="collection-chapter-title"
      className="collection-chapter"
    >
      <span aria-hidden="true" className="collection-chapter__numeral">
        {chapter}
      </span>

      <div className="collection-chapter__copy">
        <ScrollReveal>
          <p className="collection-label">The Chapter</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="collection-chapter__title"
            id="collection-chapter-title"
          >
            {title}
            <span>Chapter {chapter}</span>
          </h2>
        </ScrollReveal>
        <p className="collection-chapter__note">
          {chapterNote.lines.map((line, index) => (
            <ScrollReveal as="span" delay={0.15 + index * 0.12} key={line}>
              {line}{' '}
            </ScrollReveal>
          ))}
        </p>
        <ScrollReveal delay={0.2}>
          <p className="collection-chapter__foundation">
            {chapterNote.foundation}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <ol
            aria-label={`Chapitres ${title}`}
            className="collection-chapter__list"
          >
            {allPower.chapters.map((item) => (
              <li
                aria-current={
                  item.id === featuredChapter.id ? 'true' : undefined
                }
                className={cn(
                  'collection-chapter__item',
                  item.status === 'upcoming' &&
                    'collection-chapter__item--upcoming',
                )}
                key={item.id}
              >
                <span>Chapter {item.chapter}</span>
                <span>
                  {item.status === 'available' ? 'À découvrir' : 'À venir'}
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>

      <ScrollReveal className="collection-chapter__media" variant="unveil">
        <ParallaxImage
          alt={chapterNote.photo.alt}
          className="collection-chapter__image"
          src={chapterNote.photo.src}
        />
      </ScrollReveal>
    </section>
  )
}
