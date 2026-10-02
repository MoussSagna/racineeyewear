import workshopImage from '../../../assets/images/brand/creatrice-atelier.jpg'
import portraitImage from '../../../assets/images/carine/carine-1.jpg'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

export function BrandCreator() {
  return (
    <section aria-labelledby="brand-creator-title" className="brand-creator">
      <ScrollReveal className="brand-creator__media" variant="unveil">
        <ParallaxImage
          alt="Carine Beyssac, créatrice de RACINE, de profil dans la lumière du soir, souriante, une monture RACINE sur le nez"
          className="brand-creator__image"
          src={portraitImage}
        />
      </ScrollReveal>

      <div className="brand-creator__copy">
        <ScrollReveal>
          <BrandEyebrow index={4}>La créatrice</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title" id="brand-creator-title">
            Carine Beyssac
          </h2>
          <p className="brand-creator__lead">Une histoire de regard.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Opticienne de formation, j’ai travaillé pendant des années avec des
            lunettes, des visages et des personnalités très différentes. Et au
            fil du temps, une idée s’est imposée : j’avais envie d’aller plus
            loin que le simple choix d’une monture. J’avais envie de créer.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <figure className="brand-creator__quote">
            <blockquote>
              <p>
                «&nbsp;Créer des lunettes avec une identité. Des lunettes qui
                aient quelque chose à raconter.&nbsp;»
              </p>
            </blockquote>
            <figcaption>
              <span>Carine Beyssac</span>
              Créatrice de RACINE
            </figcaption>
          </figure>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="brand-text">
            RACINE est aussi une aventure profondément personnelle. Celle d’une
            opticienne devenue créatrice, qui apprend, expérimente, fabrique, se
            trompe parfois, recommence et construit peu à peu une maison qui lui
            ressemble.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal
        className="brand-creator__aside"
        delay={0.25}
        variant="unveil"
      >
        <div className="brand-creator__aside-frame">
          <img
            alt="Portrait en noir et blanc de Carine Beyssac, le regard baissé derrière une monture épaisse"
            decoding="async"
            loading="lazy"
            src={workshopImage}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
