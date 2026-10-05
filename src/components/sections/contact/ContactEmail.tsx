import { ArrowRight } from 'lucide-react'
import { contactEmail } from '../../../data/contact'
import { ScrollReveal } from '../../ui/ScrollReveal'

/** Le contact passe uniquement par ce lien `mailto:` : ni formulaire, ni envoi côté site. */
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
          <ArrowRight aria-hidden="true" strokeWidth={1} />
        </a>
      </ScrollReveal>
    </section>
  )
}
