import handsImage from '../../../assets/images/brand/savoir-faire-gestes.jpg'
import acetateImage from '../../../assets/images/home/craft-acetate.jpg'
import shapingImage from '../../../assets/images/home/craft-faconnage.jpg'
import { craftCommitments } from '../../../data/brand'
import { ArrowLink } from '../../ui/ArrowLink'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

const details = [
  {
    src: shapingImage,
    alt: 'La créatrice de RACINE façonne une monture à la main sur l’établi de son atelier',
  },
  {
    src: acetateImage,
    alt: 'Faces de montures découpées dans des plaques d’acétate noir et écaille',
  },
  {
    src: handsImage,
    alt: 'Deux mains baguées manipulent une monture écaille au-dessus de son étui',
  },
]

export function BrandCraft() {
  return (
    <section aria-labelledby="brand-craft-title" className="brand-craft">
      <div className="brand-craft__copy">
        <ScrollReveal>
          <BrandEyebrow index={6}>Le savoir-faire</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title" id="brand-craft-title">
            Des matériaux <br />
            d’exception.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Chez RACINE, chaque monture puise sa force dans l’acétate de
            cellulose : une matière noble, façonnée avec précision et pensée
            pour durer. Un matériau biosourcé, obtenu à partir de fibre de coton
            et de pulpe de bois.
          </p>
        </ScrollReveal>
        <dl className="brand-craft__list">
          {craftCommitments.map((commitment, index) => (
            <ScrollReveal
              className="brand-craft__item"
              delay={index * 0.08}
              key={commitment.title}
            >
              <dt>{commitment.title}</dt>
              <dd>{commitment.text}</dd>
            </ScrollReveal>
          ))}
        </dl>
        <ScrollReveal>
          <ArrowLink to="/collection" variant="text">
            Découvrir la collection
          </ArrowLink>
        </ScrollReveal>
      </div>

      <div className="brand-craft__media">
        {details.map((detail, index) => (
          <ScrollReveal
            className="brand-craft__detail"
            delay={index * 0.12}
            key={detail.src}
            variant="unveil"
          >
            <img
              alt={detail.alt}
              decoding="async"
              loading="lazy"
              src={detail.src}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
