import rootsImage from '../../../assets/images/brand/racines-montures.jpg'
import { racineRoots } from '../../../data/brand'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { BrandEyebrow } from './BrandEyebrow'

export function BrandRoots() {
  return (
    <section aria-labelledby="brand-roots-title" className="brand-roots">
      <ScrollReveal className="brand-roots__media" variant="unveil">
        <img
          alt="Deux montures RACINE, noire et écaille, posées avec leur étui sur une chamoisine marquée du logo RACINE"
          decoding="async"
          loading="lazy"
          src={rootsImage}
        />
      </ScrollReveal>

      <div className="brand-roots__copy">
        <ScrollReveal>
          <BrandEyebrow index={3}>Un nom, plusieurs racines</BrandEyebrow>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="brand-title brand-title--caps" id="brand-roots-title">
            RACINE, <br />
            plus qu’un nom.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <p className="brand-text">
            Pourquoi le nom RACINE ? Parce qu’il réunit cinq dimensions : un
            ancrage, un prénom, un repère d’optique, une culture et un
            savoir-faire.
          </p>
        </ScrollReveal>
      </div>

      <ol className="brand-roots__list">
        {racineRoots.map((root, index) => (
          <li key={root.title}>
            <ScrollReveal
              className="brand-roots__item"
              delay={0.1 + index * 0.1}
            >
              <span aria-hidden="true" className="brand-roots__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="brand-roots__name">{root.title}</h3>
                <p className="brand-roots__text">{root.text}</p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
