import acetateImage from '../../../assets/images/home/craft-acetate.jpg'
import shapingImage from '../../../assets/images/home/craft-faconnage.jpg'
import { craftPillars } from '../../../data/home'
import { ArrowLink } from '../../ui/ArrowLink'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function HomeCraft() {
  return (
    <section aria-labelledby="home-craft-title" className="home-craft">
      <div className="home-craft__media">
        <ScrollReveal className="home-craft__media-main" variant="unveil">
          <ParallaxImage
            alt="La créatrice de RACINE façonne une monture à la main sur l’établi de son atelier"
            className="home-craft__image"
            src={shapingImage}
          />
        </ScrollReveal>
        <ScrollReveal
          className="home-craft__media-detail"
          delay={0.15}
          variant="unveil"
        >
          <img
            alt="Faces de montures découpées dans des plaques d’acétate noir et écaille"
            decoding="async"
            loading="lazy"
            src={acetateImage}
          />
        </ScrollReveal>
      </div>

      <div className="home-craft__copy">
        <ScrollReveal>
          <p className="home-eyebrow">Savoir-faire</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="home-title" id="home-craft-title">
            Une fabrication <br />
            française.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="home-text">
            Chez RACINE, chaque monture puise sa force dans une matière noble,
            façonnée avec précision et pensée pour durer.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <ArrowLink to="/la-marque" variant="text">
            Découvrir le savoir-faire
          </ArrowLink>
        </ScrollReveal>
      </div>

      <dl className="home-craft__pillars">
        {craftPillars.map((pillar, index) => (
          <ScrollReveal
            className="home-craft__pillar"
            delay={index * 0.08}
            key={pillar.title}
          >
            <dt>{pillar.title}</dt>
            <dd>{pillar.text}</dd>
          </ScrollReveal>
        ))}
      </dl>
    </section>
  )
}
