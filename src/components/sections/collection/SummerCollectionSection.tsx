import { collections, summerCollection } from '../../../data/collections'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { CollectionPhoto } from './CollectionPhoto'

const pad = (value: number) => String(value).padStart(2, '0')

export function SummerCollectionSection() {
  const position =
    collections.findIndex((item) => item.id === summerCollection.id) + 1

  return (
    <section
      aria-labelledby="collection-summer-title"
      className="collection-summer"
    >
      <div className="collection-summer__header">
        <ScrollReveal>
          <p className="collection-label">
            <span aria-hidden="true">
              {pad(position)} / {pad(collections.length)} —{' '}
            </span>
            Un autre univers RACINE
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="collection-summer__title" id="collection-summer-title">
            Summer <em>Collection</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="collection-summer__collaboration">
            {summerCollection.collaboration.lead}{' '}
            <em>{summerCollection.collaboration.partner}</em>
          </p>
        </ScrollReveal>
      </div>

      <ul
        aria-label="Photographies de la Summer Collection"
        className="collection-summer__gallery"
      >
        {summerCollection.photos.map((photo, index) => (
          <li key={photo.src}>
            <ScrollReveal
              className="collection-summer__photo"
              delay={index * 0.1}
              variant="unveil"
            >
              <CollectionPhoto photo={photo} />
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
