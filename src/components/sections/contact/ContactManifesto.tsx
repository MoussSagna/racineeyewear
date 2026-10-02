import { ScrollReveal } from '../../ui/ScrollReveal'

const titleLines = ['La culture', 'dans chaque', 'regard.'] as const

export function ContactManifesto() {
  return (
    <section
      aria-labelledby="contact-manifesto-title"
      className="contact-manifesto"
    >
      <h2 className="contact-manifesto__title" id="contact-manifesto-title">
        {titleLines.map((line, index) => (
          <ScrollReveal as="span" delay={index * 0.12} key={line}>
            {line}{' '}
          </ScrollReveal>
        ))}
      </h2>
      <ScrollReveal className="contact-manifesto__quote" delay={0.3}>
        <p>
          Parce que porter des lunettes, ce n’est pas seulement voir.{' '}
          <span>C’est aussi se reconnaître.</span>
        </p>
      </ScrollReveal>
    </section>
  )
}
