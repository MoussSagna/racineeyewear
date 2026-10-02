import closingImage from '../../../assets/images/contact/regards.jpg'
import { Logo } from '../../ui/Logo'
import { ParallaxImage } from '../../ui/ParallaxImage'
import { ScrollReveal } from '../../ui/ScrollReveal'

export function ContactClosing() {
  return (
    <section aria-label="RACINE" className="contact-closing">
      <ParallaxImage
        alt="Deux femmes allongées sur la plage au soleil couchant, le visage entre les mains, lunettes RACINE sur le regard"
        className="contact-closing__image"
        src={closingImage}
      />
      <div aria-hidden="true" className="contact-closing__veil" />
      <ScrollReveal className="contact-closing__signature">
        <Logo className="contact-closing__logo" />
        <p className="contact-label">La culture dans chaque regard</p>
      </ScrollReveal>
    </section>
  )
}
