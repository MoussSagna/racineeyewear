import portraitImage from '../../../assets/images/all-power/DSCF1947.jpg'
import detailImage from '../../../assets/images/home/all-power-detail.jpg'
import { ArrowLink } from '../../ui/ArrowLink'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function HomeAllPower() {
  return (
    <section aria-labelledby="home-allpower-title" className="home-allpower">
      <div className="home-allpower__head">
        <ScrollReveal>
          <p className="home-eyebrow">Collection Chapter 01</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="home-allpower__title" id="home-allpower-title">
            ALL POWER
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="home-allpower__lead">
            <span>Une histoire de force.</span> <span>De fierté.</span>{' '}
            <span>De transmission.</span>
          </p>
        </ScrollReveal>
      </div>

      <div className="home-allpower__media">
        <ScrollReveal variant="unveil">
          <ParallaxImage
            alt="Un homme et une femme assis sur des marches, en vestes de cuir, portant des montures ALL POWER"
            className="home-allpower__image"
            src={portraitImage}
          />
        </ScrollReveal>
        <ScrollReveal
          className="home-allpower__detail"
          delay={0.2}
          variant="unveil"
        >
          <img
            alt="Gros plan sur une monture écaille ALL POWER portée de profil"
            decoding="async"
            loading="lazy"
            src={detailImage}
          />
        </ScrollReveal>
      </div>

      <div className="home-allpower__body">
        <ScrollReveal>
          <p className="home-text">
            Pour sa première collection, RACINE puise son inspiration dans le
            Black Panther Party : un mouvement qui portait des messages
            d’identité, de visibilité et d’émancipation. Des montures aux lignes
            affirmées, pensées comme des pièces intemporelles.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ArrowLink to="/collection" tone="light">
            Découvrir la collection
          </ArrowLink>
        </ScrollReveal>
      </div>
    </section>
  )
}
