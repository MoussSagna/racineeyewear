import { contactEmail } from '../../../data/contact'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function ContactEmail() {
  return (
    <section
      aria-labelledby="contact-email-title"
      className="contact-email"
      id="nous-ecrire"
    >
      <ScrollReveal>
        <p className="contact-label">Contact direct</p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <h2 className="contact-email__title" id="contact-email-title">
          Écrire à RACINE
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <a className="contact-email__address" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </ScrollReveal>
    </section>
  )
}
