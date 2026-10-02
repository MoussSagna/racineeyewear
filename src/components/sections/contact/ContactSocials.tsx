import { ArrowUpRight } from 'lucide-react'
import { socialLinks } from '../../../data/contact'
import { ScrollReveal } from '../../ui/ScrollReveal'
import { SocialIcon } from '../../ui/SocialIcon'

export function ContactSocials() {
  return (
    <section
      aria-labelledby="contact-socials-title"
      className="contact-socials"
    >
      <div>
        <ScrollReveal>
          <p className="contact-label">Suivre RACINE</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="contact-socials__title" id="contact-socials-title">
            Retrouvez-nous <br />
            aussi ici.
          </h2>
        </ScrollReveal>
      </div>

      <ul className="contact-socials__list">
        {socialLinks.map((social, index) => (
          <li key={social.id}>
            <ScrollReveal delay={0.1 + index * 0.1}>
              <a
                aria-label={social.label}
                className="contact-socials__link"
                href={social.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SocialIcon id={social.id} size={32} />
                <span className="contact-socials__name">{social.name}</span>
                <span className="contact-socials__handle">{social.handle}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="contact-socials__arrow"
                  size={20}
                  strokeWidth={1.25}
                />
              </a>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
