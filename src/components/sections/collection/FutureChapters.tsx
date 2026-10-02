import { ArrowRight } from 'lucide-react'
import { allPower } from '../../../data/collections'
import { cn } from '../../../lib/utils'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function FutureChapters() {
  return (
    <section
      aria-labelledby="collection-future-title"
      className="collection-future"
    >
      <ScrollReveal>
        <p className="collection-label">{allPower.title}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="collection-future__title" id="collection-future-title">
          The story continues.
        </h2>
      </ScrollReveal>

      <ol
        aria-label={`Chapitres ${allPower.title}`}
        className="collection-future__chapters"
      >
        {allPower.chapters.map((chapter, index) => (
          <li
            className={cn(
              'collection-future__chapter',
              chapter.status === 'upcoming' &&
                'collection-future__chapter--upcoming',
            )}
            key={chapter.id}
          >
            {index > 0 && (
              <ArrowRight
                aria-hidden="true"
                className="collection-future__arrow"
                strokeWidth={1}
              />
            )}
            <ScrollReveal delay={0.15 + index * 0.2}>
              <span className="collection-future__name">
                Chapter {chapter.chapter}
              </span>
              {chapter.status === 'upcoming' && (
                <span className="collection-label">À venir</span>
              )}
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
