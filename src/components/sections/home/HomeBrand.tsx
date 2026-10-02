import brandImage from '../../../assets/images/carine/carine-1.jpg'
import { ArrowLink } from '../../ui/ArrowLink'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function HomeBrand() {
  return (
    <section aria-labelledby="home-brand-title" className="home-brand">
      <ScrollReveal className="home-brand__media" variant="unveil">
        <figure>
          <ParallaxImage
            alt="Carine, créatrice de RACINE, de profil dans la lumière du soir, souriante, une monture RACINE sur le nez"
            className="home-brand__image"
            src={brandImage}
          />
          <figcaption>Carine, créatrice de RACINE</figcaption>
        </figure>
      </ScrollReveal>
      <div className="home-brand__copy">
        <ScrollReveal>
          <p className="home-eyebrow">La marque</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="home-title" id="home-brand-title">
            Des racines <br />
            pour voir plus loin.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="home-text">
            RACINE fait dialoguer l’optique, la mode, la Culture, le design et
            le savoir-faire artisanal. Des lunettes dans lesquelles chacun
            puisse reconnaître une part de son histoire, de sa culture ou
            simplement de sa personnalité.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <ArrowLink to="/la-marque" variant="text">
            En savoir plus
          </ArrowLink>
        </ScrollReveal>
      </div>
    </section>
  )
}
