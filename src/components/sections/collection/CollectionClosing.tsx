import { featuredChapter } from '../../../data/collections'
import { ArrowLink } from '../../ui/ArrowLink'
import { Logo } from '../../ui/Logo'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function CollectionClosing() {
  return (
    <section
      aria-labelledby="collection-closing-title"
      className="collection-closing"
    >
      <h2
        className="collection-closing__statement"
        id="collection-closing-title"
      >
        {featuredChapter.closing.map((line, index) => (
          <ScrollReveal as="span" delay={index * 0.15} key={line}>
            {line}{' '}
          </ScrollReveal>
        ))}
      </h2>

      <ScrollReveal className="collection-closing__signature" delay={0.2}>
        <Logo className="collection-closing__logo" />
        <p className="collection-label">La culture dans chaque regard</p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <ArrowLink to="/la-marque" tone="light">
          La marque
        </ArrowLink>
      </ScrollReveal>
    </section>
  )
}
