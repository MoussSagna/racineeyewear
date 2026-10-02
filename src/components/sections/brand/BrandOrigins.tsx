import frameImage from '../../../assets/images/brand/origines-monture.jpg'
import gazeImage from '../../../assets/images/brand/origines-regard.jpg'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

export function BrandOrigins() {
  return (
    <section
      aria-labelledby="brand-origins-title"
      className="brand-origins"
      id="les-origines"
    >
      <ScrollReveal className="brand-origins__media" variant="unveil">
        <ParallaxImage
          alt="Monture RACINE en acétate écaille posée sur un muret de pierre, devant un feuillage ensoleillé"
          className="brand-origins__image"
          src={frameImage}
        />
      </ScrollReveal>

      <div className="brand-origins__copy">
        <ScrollReveal>
          <BrandEyebrow index={1}>Les origines</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title" id="brand-origins-title">
            Tout a commencé <br />
            avec un regard.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Entre les virées chez l’opticien avec mon père et la collection de
            solaires de ma mère, les lunettes ont toujours fait partie de ma
            vie. C’était donc une évidence de me tourner vers le BTS
            Opticien-Lunetier après avoir tenté des études de médecine.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <p className="brand-text">
            Je voulais des modèles qui reflètent mes racines et mes influences,
            mais sans savoir comment les exprimer.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal
        className="brand-origins__aside"
        delay={0.2}
        variant="unveil"
      >
        <div className="brand-origins__aside-frame">
          <img
            alt="Profil d’une femme aux tresses sur la plage, une monture RACINE aux verres miroir sur le regard"
            decoding="async"
            loading="lazy"
            src={gazeImage}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
