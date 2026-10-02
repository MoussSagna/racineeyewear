import { featuredChapter } from '../../../data/collections'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { CollectionPhoto } from './CollectionPhoto'

export function CollectionManifesto() {
  const { title, chapter, lead, campaign, manifesto } = featuredChapter
  const [largePhoto, smallPhoto] = manifesto.photos

  return (
    <section
      aria-labelledby="collection-manifesto-title"
      className="collection-manifesto"
      id="chapter-01"
    >
      <div className="collection-manifesto__opener">
        <ScrollReveal className="collection-manifesto__index">
          <span aria-hidden="true" className="collection-manifesto__numeral">
            {chapter}
          </span>
          <p className="collection-label">
            {title} <span aria-hidden="true">—</span> Chapter {chapter}
          </p>
        </ScrollReveal>
        <h2
          className="collection-manifesto__title"
          id="collection-manifesto-title"
        >
          {lead.map((line, index) => (
            <ScrollReveal as="span" delay={index * 0.14} key={line}>
              {line}{' '}
            </ScrollReveal>
          ))}
        </h2>
      </div>

      <div className="collection-manifesto__campaign">
        {campaign.map((photo, index) => (
          <ScrollReveal
            className="collection-manifesto__campaign-photo"
            delay={index * 0.14}
            key={photo.src}
            variant="unveil"
          >
            <CollectionPhoto photo={photo} />
          </ScrollReveal>
        ))}
      </div>

      <div className="collection-manifesto__body">
        <div className="collection-manifesto__opening">
          <ScrollReveal>
            <p className="collection-label">Manifeste</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="collection-manifesto__lede">{manifesto.opening}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          className="collection-manifesto__photo collection-manifesto__photo--large"
          variant="unveil"
        >
          <ParallaxImage alt={largePhoto.alt} src={largePhoto.src} />
        </ScrollReveal>

        <ScrollReveal className="collection-manifesto__statement">
          <p>{manifesto.statement}</p>
        </ScrollReveal>

        <ScrollReveal
          className="collection-manifesto__photo collection-manifesto__photo--small"
          variant="unveil"
        >
          <CollectionPhoto photo={smallPhoto} />
        </ScrollReveal>

        <div className="collection-manifesto__text">
          {manifesto.paragraphs.map((paragraph, index) => (
            <ScrollReveal delay={index * 0.1} key={paragraph}>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.2}>
            <ul className="collection-manifesto__themes">
              {manifesto.themes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
