import universeImage from '../../../assets/images/home/universe.jpg'
import { ArrowLink } from '../../ui/ArrowLink'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function HomeUniverse() {
  return (
    <section aria-labelledby="home-universe-title" className="home-universe">
      <ParallaxImage
        alt="Visage allongé sur le sable dans la lumière dorée, une monture RACINE posée sur le regard"
        className="home-universe__image"
        src={universeImage}
      />
      <div aria-hidden="true" className="home-universe__veil" />
      <div className="home-universe__copy">
        <h2 className="home-universe__title" id="home-universe-title">
          <ScrollReveal as="span" className="home-universe__kicker">
            Entrez dans
          </ScrollReveal>{' '}
          <ScrollReveal as="span" className="home-universe__name" delay={0.1}>
            L’univers RACINE.
          </ScrollReveal>
        </h2>
        <ScrollReveal delay={0.2}>
          <p className="home-universe__text">
            Parce que nos histoires ne sont pas seulement à transmettre. Elles
            sont aussi à réinventer.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <ArrowLink to="/contact" tone="light">
            Nous contacter
          </ArrowLink>
        </ScrollReveal>
      </div>
    </section>
  )
}
