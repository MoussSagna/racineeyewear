import { ScrollReveal } from '../../ui/ScrollReveal'

export function HomeIntro() {
  return (
    <section aria-labelledby="home-intro-title" className="home-intro">
      <ScrollReveal>
        <p className="home-eyebrow">RACINE Eyewear</p>
      </ScrollReveal>
      <h2 className="home-intro__statement" id="home-intro-title">
        <ScrollReveal as="span" className="home-intro__line">
          La culture
        </ScrollReveal>{' '}
        <ScrollReveal as="span" className="home-intro__line" delay={0.1}>
          dans chaque
        </ScrollReveal>{' '}
        <ScrollReveal as="span" className="home-intro__line" delay={0.2}>
          <em>regard.</em>
        </ScrollReveal>
      </h2>
      <ScrollReveal className="home-intro__copy" delay={0.25}>
        <p>
          Parce que porter des lunettes, ce n’est pas seulement voir. C’est
          aussi se reconnaître.
        </p>
        <p>
          Chaque visage mérite d’être mis en lumière, et chaque regard doit se
          sentir spécial.
        </p>
      </ScrollReveal>
    </section>
  )
}
