import leadPortrait from '../../../assets/images/human-book/03.jpg'
import profilePortrait from '../../../assets/images/human-book/IMG_3286.jpg'
import smilePortrait from '../../../assets/images/home/human-book-02.jpg'
import wrapPortrait from '../../../assets/images/home/human-book-03.jpg'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

const portraits = [
  {
    src: profilePortrait,
    alt: 'Profil d’une femme aux cheveux tirés portant une monture translucide rosée',
  },
  {
    src: smilePortrait,
    alt: 'Portrait en noir et blanc d’un homme souriant portant une monture noire épaisse',
  },
  {
    src: wrapPortrait,
    alt: 'Femme coiffée d’un foulard orange, le regard de côté, portant une monture sombre',
  },
]

export function HomeHumanBook() {
  return (
    <section aria-labelledby="home-book-title" className="home-book">
      <div className="home-book__feature">
        <ScrollReveal className="home-book__lead" variant="unveil">
          <ParallaxImage
            alt="Femme aux cheveux bouclés, baignée de soleil, portant une monture rose translucide"
            className="home-book__lead-image"
            src={leadPortrait}
          />
        </ScrollReveal>
        <div className="home-book__panel">
          <ScrollReveal>
            <p className="home-eyebrow">Human Book</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="home-title" id="home-book-title">
              Des visages, <br />
              des histoires.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="home-book__quote">
              Une monture n’existe pleinement qu’à travers la personne qui la
              porte.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <p className="home-text">
              Ce Human Book a été imaginé pour montrer RACINE en mouvement, sur
              des visages, avec leurs différences, leurs expressions et leurs
              personnalités.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="home-book__row">
        {portraits.map((portrait, index) => (
          <ScrollReveal
            className="home-book__portrait"
            delay={index * 0.12}
            key={portrait.src}
            variant="unveil"
          >
            <img
              alt={portrait.alt}
              decoding="async"
              loading="lazy"
              src={portrait.src}
            />
          </ScrollReveal>
        ))}
        <ScrollReveal className="home-book__note" delay={0.3}>
          <p>
            Chaque photo illustre la rencontre entre une monture et un regard.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
