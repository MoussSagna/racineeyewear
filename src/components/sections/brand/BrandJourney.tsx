import journeyImage from '../../../assets/images/brand/parcours-carine.jpg'
import { journeySteps } from '../../../data/brand'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

export function BrandJourney() {
  return (
    <section aria-labelledby="brand-journey-title" className="brand-journey">
      <div className="brand-journey__copy">
        <ScrollReveal>
          <BrandEyebrow index={2}>Mon parcours</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title" id="brand-journey-title">
            Une trajectoire <br />
            guidée par la passion.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Après quelques années dans de grandes enseignes de l’optique, je
            ressentais le besoin de travailler avec des marques originales,
            authentiques. Je décide donc de rejoindre des opticiens
            indépendants, passionnés de belles montures.
          </p>
        </ScrollReveal>
      </div>

      <ol className="brand-journey__timeline">
        {journeySteps.map((step, index) => (
          <li className="brand-journey__step" key={step.label}>
            <ScrollReveal
              className="brand-journey__step-inner"
              delay={0.1 + index * 0.12}
            >
              <span className="brand-journey__label">{step.label}</span>
              <span aria-hidden="true" className="brand-journey__dot" />
              <p className="brand-journey__text">{step.text}</p>
            </ScrollReveal>
          </li>
        ))}
      </ol>

      <ScrollReveal
        className="brand-journey__media"
        delay={0.15}
        variant="unveil"
      >
        <div className="brand-journey__frame">
          <img
            alt="Carine Beyssac, lunettes sur le nez, concentrée sur une monture qu’elle tient entre ses mains"
            decoding="async"
            loading="lazy"
            src={journeyImage}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
