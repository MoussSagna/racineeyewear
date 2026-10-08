import commitmentImage from '../../../assets/images/brand/engagement.jpg'
import { brandKeywords } from '../../../data/brand'
import { ArrowLink } from '../../ui/ArrowLink'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

export function BrandCommitment() {
  return (
    <section
      aria-labelledby="brand-commitment-title"
      className="brand-commitment"
    >
      <ParallaxImage
        alt="Visage d’une femme levé vers le soleil sous un ciel bleu, une monture RACINE aux verres verts sur le regard"
        className="brand-commitment__image"
        src={commitmentImage}
      />
      <div aria-hidden="true" className="brand-commitment__veil" />

      <div className="brand-commitment__copy">
        <ScrollReveal>
          <BrandEyebrow index={7}>Notre engagement</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-commitment__title" id="brand-commitment-title">
            Élargir la norme.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-commitment__text">
            RACINE, ce n’est pas pour exclure mais pour élargir la norme. Un
            univers où on se sent vu, compris et valorisé.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <ArrowLink to="/contact" tone="light">
            Nous contacter
          </ArrowLink>
        </ScrollReveal>
      </div>

      <ScrollReveal className="brand-commitment__keywords" delay={0.3}>
        <ul>
          {brandKeywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  )
}
