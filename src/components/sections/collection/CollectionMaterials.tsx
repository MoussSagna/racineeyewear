import { featuredChapter } from '../../../data/collections'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function CollectionMaterials() {
  const { statement, items } = featuredChapter.finishes

  return (
    <section
      aria-labelledby="collection-materials-title"
      className="collection-materials"
    >
      <div className="collection-materials__header">
        <ScrollReveal>
          <p className="collection-label">Matières</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="collection-materials__statement"
            id="collection-materials-title"
          >
            {statement}
          </h2>
        </ScrollReveal>
      </div>

      <div className="collection-materials__panels">
        {items.map((finish) => (
          <article
            className={`collection-materials__panel collection-materials__panel--${finish.id}`}
            key={finish.id}
          >
            <ParallaxImage
              alt={finish.photo.alt}
              className="collection-materials__image"
              src={finish.photo.src}
            />
            <div aria-hidden="true" className="collection-materials__veil" />
            <div className="collection-materials__copy">
              <ScrollReveal>
                <p className="collection-label">{finish.label}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 className="collection-materials__name">{finish.title}</h3>
              </ScrollReveal>
              <ul className="collection-materials__words">
                {finish.words.map((word, index) => (
                  <li key={word}>
                    <ScrollReveal delay={0.2 + index * 0.12}>
                      {word}
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
