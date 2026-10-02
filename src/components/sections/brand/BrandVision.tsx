import manPortrait from '../../../assets/images/brand/vision-portrait-01.jpg'
import womanPortrait from '../../../assets/images/brand/vision-portrait-02.jpg'
import frameDetail from '../../../assets/images/home/all-power-detail.jpg'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

const faces = [
  {
    src: manPortrait,
    alt: 'Homme barbu en chemise sombre, assis devant un jardin, portant une monture RACINE aux verres teintés',
  },
  {
    src: womanPortrait,
    alt: 'Femme aux cheveux bouclés cuivrés, la tête appuyée sur la main, portant une monture rose translucide',
  },
  {
    src: frameDetail,
    alt: 'Gros plan sur une monture écaille ALL POWER portée de profil',
  },
]

export function BrandVision() {
  return (
    <section aria-labelledby="brand-vision-title" className="brand-vision">
      <div className="brand-vision__panel">
        <ScrollReveal>
          <BrandEyebrow index={5}>Voir autrement</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title" id="brand-vision-title">
            Des visages, <br />
            une diversité.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Beaucoup de marques se basent sur des morphologies standardisées, et
            trouver des montures stylées et confortables quand on a des traits
            différents, c’est un vrai défi. Adapter le design des montures aux
            différentes morphologies garantit un meilleur confort, un meilleur
            maintien et une esthétique plus harmonieuse.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <p className="brand-vision__note">
            Il n’y a pas de règles fixes quand on parle de visages. On parle de
            tendances, pas de vérités absolues.
          </p>
        </ScrollReveal>
      </div>

      <div className="brand-vision__faces">
        {faces.map((face, index) => (
          <ScrollReveal
            className="brand-vision__face"
            delay={index * 0.12}
            key={face.src}
            variant="unveil"
          >
            <img
              alt={face.alt}
              decoding="async"
              loading="lazy"
              src={face.src}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
